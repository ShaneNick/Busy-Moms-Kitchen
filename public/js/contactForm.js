function submitForm(event) {
    event.preventDefault(); // prevent the form from submitting normally
    var data = {
      name: document.querySelector('#newsletter-form [name="name"]').value,
      email: document.querySelector('#newsletter-form [name="mail"]').value,
    };
    
    if (!data.email.includes("@")) {
      var errorMessage = document.getElementById("error-message");
         errorMessage.innerHTML = "Not a valid email address.";
      return;
    }
   
    var values = JSON.parse(localStorage.getItem('Data') || '[]');
    values.push(data);
    
    // Storing the data into localStorage
    localStorage.setItem('Data', JSON.stringify(values));
  }
  
  // Assuming your form has an id of 'newsletter-form'
  document.getElementById('newsletter-form').addEventListener('submit', submitForm);
  