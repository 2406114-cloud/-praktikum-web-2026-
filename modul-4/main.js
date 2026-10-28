
const projects = [
    {
        id: 1,
        title: "Sistem Inventaris Keuangan",
        category: "Web App",
        budget: 2500000,
        completed: true
    },
    {
        id: 2,
        title: "Sistem Kasir Digital POS",
        category: "Desktop App",
        budget: 5000000,
        completed: true
    },
    {
        id: 3,
        title: "Landing Page Profil Perusahaan",
        category: "Web App",
        budget: 1500000,
        completed: false
    },
    {
        id: 4,
        title: "Aplikasi Presensi GPS Mobile",
        category: "Mobile App",
        budget: 4500000,
        completed: false
    }
];

let nextId = 5;

// Mengubah angka menjadi format Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
};

// Memperbarui statistik proyek
const updateStats = () => {
    const totalProjects = projects.length;

    const totalBudget = projects.reduce(
        (total, project) => total + project.budget,
        0
    );

    const completedCount = projects.filter(
        project => project.completed
    ).length;

    document.getElementById("stat-total-projects").textContent =
        totalProjects;

    document.getElementById("stat-total-budget").textContent =
        formatRupiah(totalBudget);

    document.getElementById("stat-completed-projects").textContent =
        completedCount;
};

// Menampilkan daftar proyek
const renderProjects = (data = projects) => {
    const container = document.getElementById("project-list");

    if (data.length === 0) {
        container.innerHTML =
            '<p class="empty-message">Proyek tidak ditemukan.</p>';
        return;
    }

    container.innerHTML = data.map(project => {
        const badgeClass = project.completed
            ? "badge-success"
            : "badge-pending";

        const statusText = project.completed
            ? "Selesai"
            : "Dalam Pengerjaan";

        return `
            <div class="project-card">
                <div class="project-info">
                    <span class="project-category">
                        ${project.category}
                    </span>

                    <h4>${escapeHTML(project.title)}</h4>

                    <p class="project-budget">
                        Anggaran: ${formatRupiah(project.budget)}
                    </p>

                    <span class="badge ${badgeClass}">
                        ${statusText}
                    </span>

                    <div class="project-actions">
                        <button
                            class="btn-status"
                            data-action="toggle"
                            data-id="${project.id}"
                            type="button"
                        >
                            Ubah Status
                        </button>

                        <button
                            class="btn-delete"
                            data-action="delete"
                            data-id="${project.id}"
                            type="button"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
};

// Mencegah teks input diperlakukan sebagai HTML
const escapeHTML = (text) => {
    return String(text).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
};

// Pencarian langsung berdasarkan nama proyek
const searchProjects = () => {
    const keyword = document
        .getElementById("search-input")
        .value.trim()
        .toLowerCase();

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(keyword)
    );

    renderProjects(filteredProjects);
};

// Menambahkan proyek baru
document.getElementById("project-form").addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        const titleInput = document.getElementById("project-title");
        const categoryInput = document.getElementById("project-category");
        const budgetInput = document.getElementById("project-budget");

        const title = titleInput.value.trim();
        const category = categoryInput.value;
        const budget = Number(budgetInput.value);

        if (!title) {
            alert("Nama proyek tidak boleh kosong!");
            titleInput.focus();
            return;
        }

        if (!category) {
            alert("Silakan pilih kategori proyek!");
            categoryInput.focus();
            return;
        }

        if (
            !Number.isSafeInteger(budget) ||
            budget < 1 ||
            budget > 1000000000000
        ) {
            alert("Anggaran harus berupa bilangan bulat positif yang valid!");
            budgetInput.focus();
            return;
        }

        const newProject = {
            id: nextId++,
            title: title,
            category: category,
            budget: budget,
            completed: false
        };

        projects.push(newProject);

        document.getElementById("project-form").reset();
        document.getElementById("search-input").value = "";

        updateStats();
        renderProjects();

        alert("Proyek berhasil ditambahkan!");
    }
);

// Menjalankan pencarian setiap kali pengguna mengetik
document.getElementById("search-input").addEventListener(
    "input",
    searchProjects
);

// Menangani tombol ubah status dan hapus proyek
document.getElementById("project-list").addEventListener(
    "click",
    (event) => {
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const projectId = Number(button.dataset.id);
        const action = button.dataset.action;

        const projectIndex = projects.findIndex(
            project => project.id === projectId
        );

        if (projectIndex === -1) return;

        if (action === "toggle") {
            projects[projectIndex].completed =
                !projects[projectIndex].completed;
        }

        if (action === "delete") {
            const confirmed = confirm(
                `Yakin ingin menghapus proyek "${projects[projectIndex].title}"?`
            );

            if (!confirmed) return;

            projects.splice(projectIndex, 1);
        }

        updateStats();
        searchProjects();
    }
);

// Menampilkan data awal saat halaman dibuka
updateStats();
renderProjects();