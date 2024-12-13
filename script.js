const tableData = []; // Array untuk menyimpan data sementara

document.getElementById('calculateButton').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const skd = parseFloat(document.getElementById('skd').value);
    const skb = parseFloat(document.getElementById('skb').value);
    const max_skb = parseFloat(document.getElementById('max_skb').value);

    if (!name || isNaN(skd) || isNaN(skb) || isNaN(max_skb)) {
        alert('Mohon masukkan data yang valid.');
        return;
    }

    const skor_maks_skd = 550; // Skor maksimal SKD tetap
    const totalScore = ((skd / skor_maks_skd * 0.4) + (skb / max_skb * 0.6)) * 100;

    // Tambahkan data ke array
    tableData.push({
        name,
        skd,
        skb,
        totalScore: totalScore.toFixed(2)
    });

    // Urutkan data berdasarkan skor total tertinggi
    tableData.sort((a, b) => b.totalScore - a.totalScore);

    // Render tabel
    renderTable();
});

function renderTable() {
    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = ''; // Kosongkan isi tabel

    tableData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.skd}</td>
            <td>${data.skb}</td>
            <td>${data.totalScore}</td>
        `;
        tbody.appendChild(row);
    });
}

// Download tabel sebagai Excel
document.getElementById('downloadExcel').addEventListener('click', function () {
    const table = document.getElementById('resultTable');
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Data Skor" });
    XLSX.writeFile(workbook, 'data_skor.xlsx');
});
