let landing = document.querySelector('.landing');
let logo = document.querySelector('logo-header');
let logoSpan = document.querySelectorAll('.logo');

// animation of navbar
window.addEventListener('DOMContentLoaded',() =>{
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            },(idx + 1) * 400)
        });
        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        }, 2000);

        setTimeout(()=>{
            landing.style.top = '-100vh';
            document.querySelectorAll('#pages li').forEach((item) => {
              item.style.animation = 'none';
              item.offsetHeight; // force reflow
              item.style.animation = 'navAssemble 2.5s ease-in-out forwards';
            });

        }, 2300);
    })
})

const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=>observer.observe(el));

// scroll bar
$(window).scroll(function(){
    var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height(),
    scrollPercent = (scroll/(dh-wh))*100;
    $('#progress-bar').css('height', scrollPercent + '%');
})

// terminal code
function startTyping(){
    const lines = document.querySelectorAll('.terminal-line');
    let delay = 0;

    lines.forEach(line=>{
        const text = line.textContent;
        line.textContent = '';
        [...text].forEach((ch, i)=>{
            setTimeout(()=>line.textContent += ch, delay + i * 40);
        });
        delay += text.length * 40 + 600;
    });
}

const aboutSection = document.querySelector('#about-right');
const aboutobserver = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            startTyping();
            aboutobserver.unobserve(aboutSection);
        }
    });
});
aboutobserver.observe(aboutSection);

// setTimeout(()=>{
//     line.style.opacity = 1;
//     line.textContent += ch;
// }, delay + i * 40);

const carousel = document.querySelector('.certificate-carousel');

carousel.addEventListener('mouseenter', () => {
  carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
  carousel.style.animationPlayState = 'running';
});


function sendMail(event) {
    event.preventDefault();

    let parms = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        message: document.querySelector("textarea[name='message']").value,
        subject: "Contact Form Submission"
    };

    emailjs.send("service_ec9t3qr", "template_2aw3duk", parms)
        .then(function(response) {
            showNotification("✅ Email sent successfully!", "success");
            document.querySelector(".contact-form").reset();
        })
        .catch(function(error) {
            showNotification("❌ Failed to send email. Please try again.", "error");
        });
}

function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove("show");
    }, 4000);
}
