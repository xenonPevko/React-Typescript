import React from 'react';
import p1ImgSrc from '../../assets/p1.jpg';
import p2ImgSrc from '../../assets/p2.jpg';
import p3ImgSrc from '../../assets/p3.jpg';

import './AboutMe.scss';

const AboutMe: React.FC = () => {
    return (<div className="am_beautyDiv">
        <h1> здравствуйте меня зовут кристина и эта страничька про меня </h1>
        <h3> боюсь я пока что мало соображаю так что на ней я покажу чему уже научилась и заодно расскажу кто я </h3>
        <h4><i> &darr; вот такая вота я &darr; </i></h4>
        <div className='am_divAM'>
            <img src={p1ImgSrc} className='am_usualImg' alt='это я (бешусь по дороге в универ)'></img>

            <img src={p2ImgSrc} className='am_usualImg' alt='это я (плачю из-за количества домашки)'></img>

            <img src={p3ImgSrc} className='am_usualImg' alt='это я (надвигаюсь)'></img>
        </div>

        <p> если вкратце я:
            <ul>
                <li> добрая (по настроению) </li>
                <li> милая (только не с утра) </li>
                <li> ответственная (если за безответственность получу люлей) </li>
                <li> дружелюбная (только к хорошим людям, коих мало)</li>
            </ul>
        </p>
        <p title="мне очень страшно!"> здесь я окзалась после того как увидела околотворческую специальность в сфере айти... &hearts; но теперь я очень замотивирована стать грамотным специалиастом! с огромной <b>(огромной)</b> зп... &hearts;</p>
        <p> ссылка на меня в вк: </p>
        <a href="https://vk.com/ksounw"> ВэКэшечка </a>
    </div>)
}

export default AboutMe;