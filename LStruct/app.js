import {Canvas} from './canvas.js'
import {PaintColor} from './paint-color.js'

window.onload = () => {
    const canvasEl = document.querySelector('canvas');
    const canvas = new Canvas(canvasEl, 200, 200);
    canvas.setTranslate(100, 100);

    //Y축 4섹션 슬라이드
    const moveDisplayAxisY = (num) => {
        const mainContent = document.querySelector('.main_content');
        mainContent.style.transform = `translateY(${num}%)`;

        const phoneFrame = document.querySelector('.floating_phone');
        if(num == 0){
            phoneFrame.classList.remove('phone_shadow');
        } else{
            phoneFrame.classList.add('phone_shadow');
        }
    }

    //캔버스 4호 그리기
    const drawArcOnCanvas = (order) => {
        const RADIUS = 85;
        const QUARTERANGLE = (Math.PI/2)
        const STARTANGLE = QUARTERANGLE*(order - 1);
        const ENDANGLE = STARTANGLE  + QUARTERANGLE;
        canvas.drawArc(PaintColor.COLORLIST[order], RADIUS, STARTANGLE, ENDANGLE);
    }

    //섹션2 동그라미 4개 움직임
    const sec2ItemAddEvent = (s2ListEl) => {
        s2ListEl.classList.add('section2_anime');
        const items = s2ListEl.children;
        let order = 0;
       
        setInterval(function(){
            if(order == 4) return;
            items[order].classList.add('item_move');
            drawArcOnCanvas(order);
            ++order;
        }, 750);
    }

    const sec2ItemRemoveEvent = (s2ListEl) => {
        s2ListEl.classList.remove('section2_anime');
        const items = s2ListEl.children;

        Array.from(items, (each) => {
            each.classList.remove('item_move');
        });
    }
    
    //섹션 2 텍스트 움직임
    const EXPAND = 'EXPAND';
    const SHRINK = 'SHRINK';
    const changeCenterTextPadding = (changeFlag) => {
        const topTextEl = document.querySelector('.section2_top_text');
        const btmTextEl = document.querySelector('.section2_bottom_text');

        switch(changeFlag){
            case EXPAND: {
                topTextEl.classList.remove('section2_top_shrink');
                btmTextEl.classList.remove('section2_btm_shrink');
                break;
            }
            case SHRINK: {
                topTextEl.classList.add('section2_top_shrink');
                btmTextEl.classList.add('section2_btm_shrink');
                break;
            }
        }
    }

    const handleVisibleOfPhone = (hiddenTarget, visibleTarget) => {
        const visibleEl = document.querySelector(visibleTarget);
        const hiddenEl = document.querySelector(hiddenTarget);
        visibleEl.classList.add('on');
        hiddenEl.classList.remove('on');
    }

    const addClassOnPhone = (num) => {
        const className = `floating_section${num}`;
        const floatingPhone = document.querySelector('.floating_phone');
        floatingPhone.classList.add(className);
    }

    const removeClassOnPhone = (num) => {
        const className = `floating_section${num}`;
        const floatingPhone = document.querySelector('.floating_phone');
        floatingPhone.classList.remove(className);

    }

    //섹션2 센터 애니메이션 종료 후
    const s2List = document.querySelector('.section2_item_list');
    s2List.addEventListener('animationend', function(e){
        changeCenterTextPadding(SHRINK);
    });

    //휠 슬라이드 움직임
    let timer;
    window.addEventListener('wheel', function(e){
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(function(){
            const wheelDirection = e.deltaY;
            const currentDisplaying = document.querySelector('.section_active');
            const cList = currentDisplaying.classList;
            const s2ItemList = document.querySelector('.section2_item_list');

            //양수 아래
            if(wheelDirection > 0){
                if(cList.contains('section4')) return;
               
                if(cList.contains('section1')){
                    moveDisplayAxisY(-25);
                    sec2ItemAddEvent(s2ItemList);
                    handleVisibleOfPhone('.section1_content', '.section2_content');
                    removeClassOnPhone(1);
                    addClassOnPhone(2);
                }

                if(cList.contains('section2')){
                    moveDisplayAxisY(-50);
                    sec2ItemRemoveEvent(s2ItemList);
                    changeCenterTextPadding(EXPAND);
                    handleVisibleOfPhone('.section2_content', '.section3_content');
                    removeClassOnPhone(2);
                    addClassOnPhone(3);
                    canvas.clear();
                }

                if(cList.contains('section3')){
                    moveDisplayAxisY(-75);
                    handleVisibleOfPhone('.section3_content', '.section4_content');
                    removeClassOnPhone(3);
                    addClassOnPhone(4);
                }

                currentDisplaying.classList.remove('section_active');
                currentDisplaying.nextElementSibling.classList.add('section_active');
            }
            //음수 위
            if(wheelDirection < 0){
                if(cList.contains('section1')) return;

                if(cList.contains('section2')){
                    moveDisplayAxisY(0)
                    sec2ItemRemoveEvent(s2ItemList);
                    changeCenterTextPadding(EXPAND);
                    handleVisibleOfPhone('.section2_content', '.section1_content');
                    removeClassOnPhone(2);
                    addClassOnPhone(1);
                    canvas.clear();
                }

                if(cList.contains('section3')){
                    moveDisplayAxisY(-25);
                    sec2ItemAddEvent(s2ItemList);
                    handleVisibleOfPhone('.section3_content', '.section2_content');
                    removeClassOnPhone(3);
                    addClassOnPhone(2);
                }

                if(cList.contains('section4')){
                    moveDisplayAxisY(-50);
                    handleVisibleOfPhone('.section4_content', '.section3_content');
                    removeClassOnPhone(4);
                    addClassOnPhone(3);
                }

                currentDisplaying.classList.remove('section_active');
                currentDisplaying.previousElementSibling.classList.add('section_active');
            }
        }
    , 250);
    });
}