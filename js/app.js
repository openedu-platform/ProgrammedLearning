let currentLanguage = "sr";  //sr ili en za sada, currentLanguage i ostale su globalne promenljive
let currentLessonFile = "racunarstvo/introductionComputerScience.json"; //osnove_racunara.json ili computer_basics.json za sada ili lessons/racunarstvo/introductionComputerScience.json
let lessonData = null;

// stanje renderera - NOVO 1.maj 23_00
let deoIndex = 0;      // koji deo lekcije
let teorijaIndex = 0; // koja teorija u tom delu

//RENDERER TEORIJE (KLJUČNI DEO), ucitava teoriju i prikazuje vizuelno
function renderTheory() {
  const lesson = lessonData[currentLanguage];
  const deo = lesson.deloviLekcije[deoIndex];
  const teorija = deo.teorija[teorijaIndex];

  // Naslovi
//  document.getElementById("lessonTitle").innerText = lesson.naslov;
  //document.getElementById("lessonTitle").innerText = lessonData[meta].license; //iskomentarisati
  document.getElementById("partTitle").innerText = deo.nazivDelaLekcije;

  // Sadržaj teorije
  let html = `<p>${teorija.tekst}</p>`;

  if (teorija.slika) {
    html += `<img src="${teorija.slika}" style="max-width:50%; margin-top:10px;">`;
  }

  if (teorija.video) {
    html += `
      <video controls style="max-width:60%; margin-top:10px;">
        <source src="${teorija.video}">
      </video>`;
  }

  document.getElementById("theoryContent").innerHTML = html;
}

//Dugme „Dalje“ (navigacija)
document.getElementById("nextBtn").onclick = () => {
  const lesson = lessonData[currentLanguage];
  const deo = lesson.deloviLekcije[deoIndex];

  teorijaIndex++;

  // kraj teorije u ovom delu
  if (teorijaIndex >= deo.teorija.length) {
    teorijaIndex = 0;
    deoIndex++;
  }

  // kraj cele lekcije
  if (deoIndex >= lesson.deloviLekcije.length) {
    document.getElementById("theoryContent").innerHTML =
      "<h3>Kraj teorije. Slede pitanja 🙂. Ovo je verzija od 1.maja26 23:20</h3>";
    document.getElementById("nextBtn").disabled = true;
    return;
  }

  renderTheory();
};

//UČITAVANJE LEKCIJE u lessonData - ako nema gresaka pri ucitavanju, rezultat je: globalna promenljiva lessonData dobija vrednost, a to je pokazivac na sadrzaj fajla `lessons/${currentLessonFile}`
async function loadLesson() {
  try {
    const response = await fetch(`lessons/${currentLessonFile}`);
    if (!response.ok) throw new Error("Lesson not found");

    lessonData = await response.json();

    deoIndex = 0;
    teorijaIndex = 0;

    renderTheory();
  } catch (e) {
    alert("Greška pri učitavanju lekcije... "+`lessons/${currentLessonFile}`);
    console.error(e);
  }
}

// Init
window.addEventListener("load", () => {
  loadLesson();
});


