function encrypt(key, plaintext, algorithm) {
    let output = "";

    switch (algorithm.value) {
        case "AESenc":
            output = CryptoJS.AES.encrypt(plaintext, key)
            break
        case "3DESenc":
            output = CryptoJS.TripleDES.encrypt(plaintext, key)
            break
        case "OTPenc":
            output = otp(plaintext, key, "encrypt", true);
            
            break
        default:
            console.log("No encryption/decryption selected")
            output = "No encrytion/decryption selected"
    }
    

    document.getElementById("view").innerHTML = output
}

function decrypt(key, cyphertext, algorithm) {
    let output = "";

    switch (algorithm.value) {
        case "AESenc":
            output = CryptoJS.AES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break
        case "3DESenc":
            output = CryptoJS.TripleDES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break
        case "OTPenc":
            output = otp(cyphertext, key, "decrypt", true);
            break
        default:
            console.log("No encryption/decryption selected")
            output = "No encryption/decryption selected"
    }
    
    if (output === "")
        output = "Wrong key"

    document.getElementById("view").innerHTML = output
}

let copyOutput = document.getElementById("copy")

copyOutput.addEventListener("click", () => {
    let copyText = document.getElementById('view')
    navigator.clipboard.writeText(copyText.innerHTML)
    
    copyOutput.innerHTML = "Copied!"
    copyOutput.disabled = true
})

let submitButton = document.getElementById("submit")

let crypt = document.getElementById("algo")

//Change event that detects change and uses the 
//new choice of encrypt or decrypt as a label of the button
//crypt.addEventListener("change", function(event) {
    //let newLabel = document.getElementById("crypt").value
    //submitButton.innerText = newLabel
})

let cryptForm = document.getElementById('mainForm')

cryptForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    let key = document.getElementById("key").value
    let text = document.getElementById("message").value
    let encdec = document.getElementById("encdec")

    if (crypt.value == 'Encrypt'){
        encrypt(key, text, encdec)
    }
    else if (crypt.value == "Decrypt"){
        decrypt(key, text, encdec)
    }

    copyOutput.innerHTML = 'Copy'
    copyOutput.disabled = false
})
