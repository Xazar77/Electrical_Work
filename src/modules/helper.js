export const animate = ({ timing, draw, duration }) => {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};



export const openModal = (elem, overlay) => {
	elem.style.display = 'block'
	overlay.style.display = 'block'
	animate({
		duration: 1000,
		timing(timeFraction) {
		  return timeFraction;
		},
		draw(progress) {
			elem.style.opacity = progress ;
			overlay.style.opacity = progress ;
		}
	  });

}


export const closeModal = (elem, overlay) => {
    
	animate({
		duration: 1000,
		timing(timeFraction) {
			return timeFraction;
		},
		draw(progress) {
			elem.style.opacity = 1 - progress ;
			overlay.style.opacity = 1 - progress ;
		}
	});
	setTimeout(() => {
		elem.style.display = 'none'
		// overlay.style.display = 'none'
	}, 1050)
}


// export const validInputs = (form) => {
// 	const listsInput = form.querySelectorAll("input");

// 	const testFio = /[а-яё\- ]/gi
// 	const testTel = /^(\+7|8)\(\d{3}\)\d{3}\-?\d{2}\-?\d{2}$/g


// 	listsInput.forEach((input) => {
// 		if (input === document.querySelector("input[name=fio]" )) {
			
// 			input.addEventListener("input", (e) => {
// 				if(e.target.value !=='') {

// 					input.value = (e.target.value[0].toUpperCase() + e.target.value.substring(1))
// 						.replace(/[^а-яА-Я-\ ]+/g, '')

// 					if(testFio.test(input.value) && input.value !=='') {
// 						input.classList.add('success')
// 						input.style.border = '1px solid green'
// 					} else {
// 						input.classList.remove('success')
// 						input.style.border = '1px solid red'
// 					}
// 				} else {
// 					e.target.classList.remove('success')
// 					e.target.style.border = '1px solid red'
// 				}
// 			});
// 		}
// 		if(input === document.querySelector('input[name=tel]')) {

// 			input.addEventListener("input", (e) => {
// 				if(e.target.value !=='') {
// 					input.value = e.target.value.replace(/[^0-9\-\(\)\+]+/g, "");
// 					if(testTel.test(input.value)) {
// 						input.classList.add('success')
// 						input.style.border = '1px solid green'
// 					} else {
// 						input.classList.remove('success')
// 						input.style.border = '1px solid red'
// 					}

// 				} else {
// 					e.target.classList.remove('success')
// 					e.target.style.border = '1px solid red'
// 				}
// 			});
// 		}


// 	});

// };




export const validInputs = (form) => {


	const listsInput = form.querySelectorAll("input");
	// console.log(listsInput)
	const testFio = /[а-яё\- ]/gi
	const testMessage = /[а-яёА-Я\-\.\!\, ]/g


	if(form === document.querySelector('[name=form-feedback]')) {
		const inputText = form.querySelector('[name=message]')
		
		inputText.addEventListener("input", (e) => {
			if(e.target.value !=='') {

				inputText.value = (e.target.value[0].toUpperCase() + e.target.value.substring(1))
					.replace(/[^а-яёА-Я\-\.\!\, ]+/g, '')

				if(testMessage.test(inputText.value)) {
					inputText.classList.add('success')
					inputText.style.border = '1px solid green'
				} else {
					inputText.classList.remove('success')
					inputText.style.border = '1px solid red'
				}
			} else {
				inputText.classList.remove('success')
				inputText.style.border = '1px solid red'
			}
		});
		
	}
	

	listsInput.forEach((input) => {
		
		if (input.closest("input[name=fio]")) {
			// console.log(input)
			input.addEventListener("input", (e) => {
				if(e.target.value !=='') {

					input.value = (e.target.value[0].toUpperCase() + e.target.value.substring(1))
						.replace(/[^а-яА-Я-\ ]+/g, '')

					if(testFio.test(input.value)) {
						input.classList.add('success')
						input.style.border = '1px solid green'
					} else {
						input.classList.remove('success')
						input.style.border = '1px solid red'
					}
				} else {
					e.target.classList.remove('success')
					e.target.style.border = '1px solid red'
				}
			});
		} else if(input.closest('input[name=tel]')) {
			[].forEach.call( document.querySelectorAll('input[name=tel]'), (input) => {
				let keyCode;
				
				
				function mask(event) {
					event.keyCode && (keyCode = event.keyCode);
					let pos = this.selectionStart;
					if (pos < 3) event.preventDefault();
					let matrix = "+7 (___) ___ ____",
						i = 0,
						def = matrix.replace(/\D/g, ""),
						val = this.value.replace(/\D/g, ""),
						new_value = matrix.replace(/[_\d]/g, function(a) {
							
							return i < val.length ? val.charAt(i++) : a
						});
					i = new_value.indexOf("_");
					if (i != -1) {
						i < 5 && (i = 3);
						new_value = new_value.slice(0, i)
						
					}
					let reg = matrix.substr(0, this.value.length).replace(/_+/g,
					function(a) {
						return "\\d{1," + a.length + "}"
					}).replace(/[+()]/g, "\\$&");

					  reg = new RegExp("^" + reg + "$");
				
					if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
						this.value = new_value;
						if(this.value.length < 17) {
							input.style.border = '1px solid red'
							input.classList.remove('success')
						} else {

							input.classList.add('success')
							input.style.border = '1px solid green'
						}
					} else {
						input.style.border = '1px solid red'
						input.classList.remove('success')
					}
					if (event.type == "blur" && this.value.length < 5) {
						this.value = "";
						
					}
				}
			
				input.addEventListener("input",  mask, false);
				input.addEventListener("focus", mask, false);
				input.addEventListener("blur", mask, false);
				input.addEventListener("keydown", mask, false);
			
			});
		}


	});

};





export const validData = (form) => {
	const listsInput = form.querySelectorAll("input")
	
	let success = false

	const inputArr = []

	if(form === document.querySelector('form[name=form-feedback]')) {
		const textArea = form.querySelector('textarea[name=message]')
		const inputs = form.querySelectorAll('input')
		inputs.forEach(input => {
			if(input.classList.contains('success')) {
				inputArr.push(input)
				
			}
		})
		if(textArea.classList.contains('success')) {
			inputArr.push(textArea)
		}
		if(inputArr.length === 3) {
			success = true
		}

	} else if(!(form === document.querySelector('form[name=form-feedback]'))){

		listsInput.forEach(input => {
			
			if(input.classList.contains('success') && input.value !="") {
				inputArr.push(input)
			}
		}) 
		if(inputArr.length === 2) {
			success = true
		}
	}
	

	return success
}
