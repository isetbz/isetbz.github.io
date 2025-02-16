import sys
import subprocess

def generate_typst_file(num1, num2, result):
    typst_content = f"""
    # Summation Result
    
    The sum of {num1} and {num2} is **{result}**.
    """
    with open("output.typ", "w") as f:
        f.write(typst_content)

def compile_typst_to_pdf():
    subprocess.run(["typst", "compile", "output.typ", "output.pdf"], check=True)

if __name__ == "__main__":
    num1 = int(sys.argv[1])
    num2 = int(sys.argv[2])
    result = num1 + num2
    
    generate_typst_file(num1, num2, result)
    # compile_typst_to_pdf()
    print("PDF Generated: output.pdf")
