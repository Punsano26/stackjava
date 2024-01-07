const stackContainer = document.getElementById("stack-container");
const block1 = document.querySelector(".block1");
const block2 = document.querySelector(".block2");
const maxStackSize = 10;
const statusMessage = document.getElementById("status-message");
const countMessage = document.getElementById("count-message");
const positionMessage = document.getElementById("position-message"); // Corrected element ID

block1.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "block1");
});

block2.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "block2");
});

stackContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

stackContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");

  // ตรวจสอบว่าสแต็กไม่เต็มก่อนที่จะเพิ่มบล็อกใหม่
  if (stackContainer.childElementCount < maxStackSize) {
    if (data === "block1") {
      const newBlock = block1.cloneNode(true);
      stackContainer.appendChild(newBlock);
    } else if (data === "block2") {
      const newBlock = block2.cloneNode(true);
      stackContainer.appendChild(newBlock);
    }
  }

  updateStatus();
});
//ดับเบิลคลิปลบสแต็ก
stackContainer.addEventListener("dblclick", (e) => {
  if (
    e.target.classList.contains("block1") ||
    e.target.classList.contains("block2")
  ) {
    stackContainer.removeChild(e.target);
    updateStatus();
  }
});

// ฟังก์ชั่นเพื่อรับขนาดสแต็กปัจจุบัน
function getStackSize() {
  return stackContainer.childElementCount;
}

// ฟังก์ชั่นอัพเดตสถานะ (จำนวนและข้อความ) ตามขนาดสแต็ก
function updateStatus() {
  const currentStackSize = getStackSize();
  countMessage.textContent = `Count: ${currentStackSize}`;

  if (currentStackSize === 0) {
    statusMessage.textContent = "Stack is empty.";
    positionMessage.textContent = ""; // ล้างข้อความตำแหน่งเมื่อสแต็กว่างเปล่า
  } else if (currentStackSize === maxStackSize) {
    statusMessage.textContent = "Stack is full.";
    positionMessage.textContent += `${blockType}(${i + 1}) `;
  } else {
    // แสดงตำแหน่งของแต่ละบล็อกในสแต็ก
    positionMessage.textContent = "Positions: ";
    const stackChildren = stackContainer.children;
    for (let i = 0; i < stackChildren.length; i++) {
      const blockType = stackChildren[i].classList.contains("block1")
        ? "block1"
        : "block2";
      positionMessage.textContent += `${blockType}(${i + 1}) `;
    }
  }
}



// Initial update of status
updateStatus();