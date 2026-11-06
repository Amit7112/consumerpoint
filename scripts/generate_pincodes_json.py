import zipfile
import xml.etree.ElementTree as ET
import re
import json

wb_path = "Pin Code Mapping Details.xlsx"
with zipfile.ZipFile(wb_path, 'r') as z:
    ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss_xml = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in ss_xml.findall('.//main:si', ns):
            t_elems = si.findall('.//main:t', ns)
            text = "".join(t.text or "" for t in t_elems)
            shared_strings.append(text)
            
    rels_xml = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rel_ns = {'r': 'http://schemas.openxmlformats.org/package/2006/relationships'}
    sheet_files = {}
    for rel in rels_xml.findall('.//r:Relationship', rel_ns):
        rid = rel.attrib['Id']
        target = rel.attrib['Target']
        sheet_files[rid] = 'xl/' + target if not target.startswith('xl/') else target

    def get_sheet_rows(sheet_name):
        for sheet in ET.fromstring(z.read('xl/workbook.xml')).findall('.//main:sheet', ns):
            if sheet.attrib['name'] == sheet_name:
                rid = sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                sheet_xml = ET.fromstring(z.read(sheet_files[rid]))
                rows = []
                for row in sheet_xml.findall('.//main:row', ns):
                    cells = {}
                    for c in row.findall('.//main:c', ns):
                        ref = c.attrib.get('r', '')
                        t = c.attrib.get('t', '')
                        v = c.find('main:v', ns)
                        val = ""
                        if v is not None and v.text is not None:
                            val = v.text
                            if t == 's':
                                val = shared_strings[int(val)]
                        col_match = re.match(r'([A-Z]+)', ref)
                        col_letter = col_match.group(1) if col_match else ref
                        cells[col_letter] = val
                    if any(cells.values()):
                        rows.append(cells)
                return rows
        return []

    s3_rows = get_sheet_rows('Sheet3')[1:]
    
    # Clean and normalize function
    def clean_val(v, default="Not Available"):
        if not v or v.strip() in ['NA', 'N/A', 'na', '']:
            return default
        return v.strip()

    def standardize_taluk(t):
        if not t or t.strip() in ['NA', 'N/A', '']:
            return "Not Available"
        t = t.strip()
        tl = t.lower()
        if 'badlapur' in tl or 'badalapur' in tl:
            return 'Badlapur'
        if 'mariahu' in tl or 'mariahun' in tl:
            return 'Mariahu'
        if 'machhali' in tl or 'machhalishahar' in tl or 'machhlishahr' in tl or 'machali' in tl:
            return 'Machhlishahr'
        if 'shahganj' in tl or 'shahgunj' in tl:
            return 'Shahganj'
        if 'kerakat' in tl:
            return 'Kerakat'
        if 'jaunpur' in tl:
            return 'Jaunpur'
        return t

    records = []
    seen = set()

    for idx, r in enumerate(s3_rows, 1):
        raw_name = r.get('B', '').strip()
        # Clean bracket if any like "Khapraha] B.O" -> "Khapraha B.O"
        clean_name = re.sub(r'\]', '', raw_name).strip()
        pin = r.get('C', '').strip()
        otype = clean_val(r.get('D', ''))
        rso = clean_val(r.get('E', ''))
        rho = clean_val(r.get('F', ''))
        raw_taluk = r.get('G', '').strip()
        taluk = standardize_taluk(raw_taluk)
        dist = clean_val(r.get('H', ''), "Jaunpur")
        
        # Deduplication key
        key = (clean_name.lower(), pin)
        if key in seen:
            continue
        seen.add(key)
        
        records.append({
            'id': f"LOC-{len(records)+1:04d}",
            'officeName': clean_name,
            'pincode': pin,
            'officeType': otype,
            'relatedSuboffice': rso,
            'relatedHeadOffice': rho,
            'taluk': taluk,
            'district': dist,
            'areaCategory': 'Core Service Area'
        })

    # Add Sheet 1: UpCountry locations
    s1_rows = get_sheet_rows('Sheet1')[2:]
    upcountry_meta = {
        '212217': {'officeType': 'S.O', 'taluk': 'Sirathu', 'district': 'Kaushambi', 'rho': 'Manjhanpur H.O'},
        '212201': {'officeType': 'B.O', 'taluk': 'Chail', 'district': 'Kaushambi', 'rho': 'Not Available'},
        '212202': {'officeType': 'S.O', 'taluk': 'Prayagraj', 'district': 'Prayagraj', 'rho': 'Prayagraj H.O'}
    }
    
    for r in s1_rows:
        place = r.get('A', '').strip()
        pin = r.get('B', '').strip()
        if not place or not pin:
            continue
        key = (place.lower(), pin)
        if key in seen:
            continue
        seen.add(key)
        
        meta = upcountry_meta.get(pin, {
            'officeType': 'Not Available',
            'taluk': 'Not Available',
            'district': 'Prayagraj / Kaushambi',
            'rho': 'Not Available'
        })
        
        records.append({
            'id': f"LOC-{len(records)+1:04d}",
            'officeName': place,
            'pincode': pin,
            'officeType': meta['officeType'],
            'relatedSuboffice': 'Not Available',
            'relatedHeadOffice': meta['rho'],
            'taluk': meta['taluk'],
            'district': meta['district'],
            'areaCategory': 'UpCountry Service Location'
        })

    print(f"Generated {len(records)} total records!")
    
    # Verify statistics
    pincodes = sorted(list(set(r['pincode'] for r in records)))
    districts = sorted(list(set(r['district'] for r in records)))
    taluks = sorted(list(set(r['taluk'] for r in records)))
    print(f"Unique PIN Codes: {len(pincodes)}")
    print(f"Districts: {districts}")
    print(f"Taluks/Sub-districts: {taluks}")
    
    # Save to JSON
    import os
    os.makedirs("src/data", exist_ok=True)
    os.makedirs("config", exist_ok=True)
    out_path = "src/data/pincodes.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    print(f"Saved to {out_path}")
    
    # Also save to config/pincodes.json for backend
    with open("config/pincodes.json", "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    print("Saved to config/pincodes.json")
