import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default async function handlePdfUpload(e, setForm, setLoadingPdf, setFileName) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Only PDF files allowed");
    return;
  }
  setFileName(file.name);
  setLoadingPdf(true);

  try {
    const url = URL.createObjectURL(file);

    const pdf = await pdfjsLib.getDocument(url).promise;

    setForm(prev => ({
      ...prev,
      totalPages: pdf.numPages,
      fileUrl: url
    }));
  } catch (err) {
    console.error(err);
    alert("Failed to read PDF");
  }

  setLoadingPdf(false);
}


  /*  (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(prev => ({
        ...prev, totalPages: pdf.numPages
      }));
    }
  }*/