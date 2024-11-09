// تعريف العناصر
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelBtn = document.getElementById('cancelBtn');
const notesList = document.getElementById('notesList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');

// دالة لتحميل الملاحظات من LocalStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // مسح الملاحظات الحالية
    notes.forEach(note => {
        createNoteElement(note);
    });
}

// دالة لإنشاء الملاحظة وعرضها
function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-box');
    noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button class="editBtn">Edite</button>
        <button class="deleteBtn">Delete</button>
    `;
    notesList.appendChild(noteDiv);

    // إضافة وظيفة التحرير
    noteDiv.querySelector('.editBtn').addEventListener('click', () => {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteModal.style.display = 'flex';
        noteDiv.remove();
    });

    // إضافة وظيفة الحذف
    noteDiv.querySelector('.deleteBtn').addEventListener('click', () => {
        noteDiv.remove();
        deleteNoteFromStorage(note);
    });
}

// دالة لحفظ الملاحظة في LocalStorage
function saveNoteToStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// دالة لحذف ملاحظة من LocalStorage
function deleteNoteFromStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(n => n.title !== note.title || n.content !== note.content);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// عند إضافة ملاحظة جديدة
addNoteBtn.addEventListener('click', () => {
    noteModal.style.display = 'flex';
    noteTitle.value = '';
    noteContent.value = '';
});

// إغلاق النموذج
cancelBtn.addEventListener('click', () => {
    noteModal.style.display = 'none';
});

// حفظ الملاحظة
saveNoteBtn.addEventListener('click', () => {
    const title = noteTitle.value;
    const content = noteContent.value;

    if (title && content) {
        const newNote = { title, content };
        createNoteElement(newNote);
        saveNoteToStorage(newNote);
        noteModal.style.display = 'none';
    }
});

// تحميل الملاحظات عند فتح الصفحة
loadNotes();
const clearNotesBtn = document.getElementById('clearNotesBtn');

// دالة لحذف جميع الملاحظات من LocalStorage
function clearAllNotes() {
    localStorage.removeItem('notes');
    notesList.innerHTML = ''; // مسح الملاحظات من واجهة المستخدم
}

// إضافة حدث للزر الجديد
clearNotesBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all notes?")) {
        clearAllNotes();
    }
});
