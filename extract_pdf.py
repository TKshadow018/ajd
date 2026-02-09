import PyPDF2

pdf_path = r"c:\Users\Snigtus\Downloads\Documents\Final July Chater 16 October 2025.pdf"
output_path = r"c:\Users\Snigtus\Desktop\Professional\ajd_nganj\pdf_content.txt"

with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    num_pages = len(reader.pages)
    print(f"Total pages: {num_pages}")
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        full_text += f"\n\n{'='*60}\n=== PAGE {i+1} ===\n{'='*60}\n\n{text}"
        print(f"Extracted page {i+1}/{num_pages}")
    
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(full_text)
    
    print(f"\nSaved to: {output_path}")
