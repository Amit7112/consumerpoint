import zipfile
import xml.etree.ElementTree as ET
import re
import json

wb_path = "Consumer_Point_Technician_PIN_Mapping_System.xlsx"
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
        sheet_files[rel.attrib['Id']] = 'xl/' + rel.attrib['Target']

    def get_sheet_rows(sheet_name):
        for sheet in ET.fromstring(z.read('xl/workbook.xml')).findall('.//main:sheet', ns):
            if sheet.attrib['name'] == sheet_name:
                s_xml = ET.fromstring(z.read(sheet_files[sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]))
                rows = []
                for row in s_xml.findall('.//main:row', ns):
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

    print("=== Technician Master ===")
    tm_rows = get_sheet_rows('Technician Master')[3:] # skip title & header
    for r in tm_rows:
        tech_id = r.get('A', '').strip()
        name = r.get('B', '').strip()
        mob = r.get('C', '').strip()
        pin = r.get('D', '').strip()
        area = r.get('E', '').strip()
        skills = r.get('F', '').strip()
        stype = r.get('G', '').strip()
        cap = r.get('H', '').strip()
        avail = r.get('I', '').strip()
        status = r.get('J', '').strip()
        print(f"Tech: {tech_id} | Name: '{name}' | Mob: {mob} | BasePIN: {pin} | Area: {area} | Skills: {skills} | Cap: {cap} | Avail: {avail} | Status: {status}")

    print("\n=== PIN Mapping non-empty rows ===")
    pm_rows = get_sheet_rows('PIN Mapping')[3:]
    non_empty_pm = []
    for r in pm_rows:
        # Check if there is more than just formula/status
        vals = [r.get(k, '').strip() for k in ['B', 'C', 'D', 'E', 'F', 'G']]
        if any(vals):
            non_empty_pm.append(r)
    print(f"Total non-empty PIN mappings: {len(non_empty_pm)}")
    for r in non_empty_pm:
        print(r)
