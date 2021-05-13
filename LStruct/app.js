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

    //폰 움직임
    const movePhoneFrame = (left, bottom) => {
        const floatingPhone = document.querySelector('.floating_phone');
        floatingPhone.style.left = left;
        floatingPhone.style.bottom = bottom;
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
        },750);
    }

    const sec2ItemRemoveEvent = (s2ListEl) => {
        s2ListEl.classList.remove('section2_anime');
        const items = s2ListEl.children;

        Array.from(items, (each) => {
            each.classList.remove('item_move');
        });
    }
    
    const topElForPreValue = document.querySelector('.section2_top_text').style.paddingTop;
    const btmElForPreValue = document.querySelector('.section2_bottom_text').style.paddingTop;
    const EXPAND = 'EXPAND';
    const SHRINK = 'SHRINK';
    const changeCenterTextPadding = (changeFlag) => {
        const expPaddingOfTop= topElForPreValue;
        const expPaddingOfBtm = btmElForPreValue;
        const shrPaddingOfTop = '161px';
        const shrPaddingOfBtm = '0px';
        const topTextEl = document.querySelector('.section2_top_text');
        const btmTextEl = document.querySelector('.section2_bottom_text');

        switch(changeFlag){
            case EXPAND: {
                topTextEl.style.paddingTop = expPaddingOfTop;
                btmTextEl.style.paddingTop = expPaddingOfBtm;
                break;
            }
            case SHRINK: {
                topTextEl.style.paddingTop = shrPaddingOfTop;
                btmTextEl.style.paddingTop = shrPaddingOfBtm;
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
            const sec1PhonePosition = ['615px', '-105px'];
            const sec2PhonePosition = ['585px', '155px'];
            const sec3PhonePosition = ['810px', '-268px'];
            const sec4PhonePosition = ['1065px', '187px'];

            //양수 아래
            if(wheelDirection > 0){
                if(cList.contains('section4')) return;
               
                if(cList.contains('section1')){
                    moveDisplayAxisY(-25);
                    movePhoneFrame(sec2PhonePosition[0], sec2PhonePosition[1]);
                    sec2ItemAddEvent(s2ItemList);
                    handleVisibleOfPhone('.section1_content', '.section2_content');
                }

                if(cList.contains('section2')){
                    moveDisplayAxisY(-50);
                    movePhoneFrame(sec3PhonePosition[0], sec3PhonePosition[1]);
                    sec2ItemRemoveEvent(s2ItemList);
                    changeCenterTextPadding(EXPAND);
                    handleVisibleOfPhone('.section2_content', '.section3_content');
                }

                if(cList.contains('section3')){
                    moveDisplayAxisY(-75);
                    movePhoneFrame(sec4PhonePosition[0], sec4PhonePosition[1]);
                    handleVisibleOfPhone('.section3_content', '.section4_content');
                }

                currentDisplaying.classList.remove('section_active');
                currentDisplaying.nextElementSibling.classList.add('section_active');
            }
            //음수 위
            if(wheelDirection < 0){
                if(cList.contains('section1')) return;

                if(cList.contains('section2')){
                    moveDisplayAxisY(0)
                    movePhoneFrame(sec1PhonePosition[0], sec1PhonePosition[1]);
                    sec2ItemRemoveEvent(s2ItemList);
                    changeCenterTextPadding(EXPAND);
                    handleVisibleOfPhone('.section2_content', '.section1_content');
                }

                if(cList.contains('section3')){
                    moveDisplayAxisY(-25);
                    movePhoneFrame(sec2PhonePosition[0], sec2PhonePosition[1]);
                    sec2ItemAddEvent(s2ItemList);
                    handleVisibleOfPhone('.section3_content', '.section2_content');
                }

                if(cList.contains('section4')){
                    moveDisplayAxisY(-50);
                    movePhoneFrame(sec3PhonePosition[0], sec3PhonePosition[1]);
                    handleVisibleOfPhone('.section4_content', '.section3_content');
                }

                currentDisplaying.classList.remove('section_active');
                currentDisplaying.previousElementSibling.classList.add('section_active');
            }
        }
    ,250);
    });
}