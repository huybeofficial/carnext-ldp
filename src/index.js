
const trim = (text = "") => text.replace(/^\s+|\s+$/gm, '');
const valid_phone = (text = "") => text.replace(/[^\d]/g, '');

const handleSubmit = () => {
    const garage_name = document.getElementById("Garage name").value;
    const owner_name = document.getElementById("owner_name-input").value;
    const phone = document.getElementById("phone-input").value;
    const address = document.getElementById("address-input").value;
    const serviceAttention = document.getElementById("service_attention-input").value;

    const dataInput = {
        "garage_name": trim(garage_name),
        "owner_name": trim(owner_name),
        "phone": valid_phone(phone),
        "address": trim(address),
        "service_attention": serviceAttention,
    };

    if (!dataInput.owner_name) {
        return showCustomAlert(`Vui lòng nhập họ và tên!`, true);
    }
    if (!dataInput.phone) {
       return showCustomAlert(`Vui lòng nhập số điện thoại!`, true);
    }
    if (dataInput.phone && !/^\d{10,11}$/.test(dataInput.phone)) {
        return showCustomAlert(`Số điện thoại không đúng định dạng!`, true);
    }

    if (dataInput.owner_name && dataInput.phone) {
        fetch("https://gara.carnext.vn/api/v1/garage-contact",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataInput),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response:", data);
            if (data.code === 200) {
                showModal("Yêu cầu thành công!", false);
                setTimeout(() => {
                    closeModal();
                }, 4000);
            } else {
                showCustomAlert(data.message, true);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showCustomAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!", true);
        });
    }
};


const showCustomAlert = (message, isError) => {
    const customAlert = document.getElementById("customAlert");
    customAlert.textContent = message;
    customAlert.style.backgroundColor = isError ? "#f44336" : "#4CAF50";
    customAlert.style.display = "block";

    setTimeout(() => {
        customAlert.style.display = "none";
    }, 3000);
};

const showModal = (message, isError) => {
    const customModal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");

    modalTitle.textContent = message;
    modalMessage.textContent = "Chúng tôi đã nhận được thông tin và sẽ sớm liên hệ lại.";

    if (isError) {
        modalTitle.style.color = "#f44336";
    } else {
        modalTitle.style.color = "#4CAF50";
    }

    customModal.style.display = "block";
}

const closeModal = () => {
    const customModal = document.getElementById("customModal");
    customModal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", closeModal);
});
