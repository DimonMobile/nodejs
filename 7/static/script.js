window.onload = () => {
    let height = 0;
    setInterval(() => {
        let element = document.getElementById('animated');
        if (element != undefined) {
            element.style.top = height + 'px';
            if (height <= 500)
                height += 0.5;
        }
    }, 16);
};