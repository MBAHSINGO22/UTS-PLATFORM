function submitStep1() {
  const getValue = id => document.getElementById(id).value.trim();
  const namaDepan = getValue("namaDepan");
  const namaBelakang = getValue("namaBelakang");
  const email = getValue("email");
  const jumlah = parseInt(getValue("jumlah"));

  if (!namaDepan || !namaBelakang || !email || isNaN(jumlah) || jumlah <= 0) {
    alert("Semua kolom harus diisi dengan benar!");
    return;
  }

  ["namaDepan", "namaBelakang", "email", "jumlah"].forEach(id => {
    document.getElementById(id).disabled = true;
  });

  event.target.style.display = "none";

  const formStep2 = document.getElementById("form-step-2");
  formStep2.innerHTML = `<h5 class="mb-3">Masukkan ${jumlah} Pilihan Hobi:</h5>` + 
    Array.from({ length: jumlah }, (_, i) => `
      <div class="mb-2">
        <label for="pilihan${i + 1}" class="form-label">Pilihan ${i + 1}:</label>
        <input type="text" id="pilihan${i + 1}" class="form-control" placeholder="Contoh: Basket" required>
      </div>`).join("");

  const submitButton = document.createElement("button");
  submitButton.className = "btn btn-primary mt-2";
  submitButton.textContent = "Oke";
  submitButton.onclick = () => submitStep2(jumlah, submitButton);
  formStep2.appendChild(submitButton);
  formStep2.style.display = "block";
}

function submitStep2(jumlah, submitButton) {
  const pilihan = [];

  for (let i = 1; i <= jumlah; i++) {
    const input = document.getElementById(`pilihan${i}`);
    const value = input.value.trim();

    // Validasi tidak kosong dan hanya huruf 
    if (!value) {
      alert("Semua pilihan hobi harus diisi!");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      alert(`Pilihan ${i} hanya boleh berisi huruf!`);
      return;
    }

    pilihan.push(value);
    input.disabled = true;
  }

  submitButton.style.display = "none";

  const formStep3 = document.getElementById("form-step-3");
  formStep3.innerHTML = `<h5 class="mb-3">Pilih Hobi yang Anda Sukai:</h5>` +
    pilihan.map((item, index) => `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${item}" id="hobi${index}">
        <label class="form-check-label" for="hobi${index}">${item}</label>
      </div>`).join("") +
    `<button class="btn btn-success mt-3" onclick='submitStep3(${JSON.stringify(pilihan)})'>Oke</button>`;

  formStep3.style.display = "block";
}

function submitStep3(pilihanArray) {
  const selected = pilihanArray.filter((_, index) =>
    document.getElementById(`hobi${index}`).checked
  );

  if (!selected.length) {
    alert("Silakan pilih minimal satu hobi yang Anda sukai.");
    return;
  }

  const getValue = id => document.getElementById(id).value.trim();
  const namaDepan = getValue("namaDepan");
  const namaBelakang = getValue("namaBelakang");
  const email = getValue("email");
  const jumlah = document.getElementById("jumlah").value;

  document.getElementById("hasil").innerHTML = `
    <div class="alert alert-info">
      Halo, nama saya <strong>${namaDepan} ${namaBelakang}</strong>, dengan email <strong>${email}</strong>.<br>
      Saya mempunyai sejumlah <strong>${jumlah}</strong> pilihan hobi yaitu: <em>${pilihanArray.join(", ")}</em>,
      dan saya menyukai <strong>${selected.join(", ")}</strong>.
    </div>
  `;
  document.getElementById("hasil").style.display = "block";

  document.querySelectorAll("button").forEach(btn => btn.style.display = "none");
  document.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
}
