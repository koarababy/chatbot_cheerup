// // HTMLでbtnFuncの参照ができないので外してみた
// // ( () => {
//   // チャット
//   const chatContents = [
//   'こんにちは稲葉浩志です！どんなお悩みを相談されますか？',
//   'こんなチャットなんてしてるからダメなんですよ！行動をしないと！',
//   [['うるさい！黙って勉強しろ！'],['黙れ！さっさと勉強しろ']]
//   ]

//   // BOTの返信回数
//   let count = 0;
//   const　output = (val, person) => {
//     const $chatSpace = document.getElementById('chat-space');
//     $chatSpace.scrollTo(0, $chatSpace.scrollHeight-$chatSpace.clientHeight);

//     const $ul = document.getElementById('chat-chat');

//     const $li = document.createElement('li');

//     const $div = document.createElement('div');
//     $div.textContent = val;

//     if(person === 'me'){
//       $div.classList.add('chat-right');
//       $li.classList.add('right');
//       $ul.appendChild(li);
//       $ul.appendChild(div);
//     }else if(person === 'robot'){
//       // 相手
//         // ロボットが2個連続で返信してくる時、その間は返信不可にする
//         // なぜなら、自分の返信を複数受け取ったことになり、その全てに返信してきてしまうから
//         // （今回のロボットの連続返信は2個以内とする）
//         chatBtn.disabled = true;
//         setTimeout( () => {
//             chatBtn.disabled = false;
//             li.classList.add('left');
//             div.classList.add('chat-left');
//             ul.appendChild(li);
//             li.appendChild(div);
//             count++;
//         },2000);
//     }
//       console.log($chatSpace)


//   }

//   const inputText = document.getElementById('chat-text');
//   const chatBtn = document.getElementById('chat-button');
  
// // // 送信ボタン押したときの処理
// const btnFunc = () => {
//   if(!inputText.value){
//     return false;
//   }
//   output(inputText.value, 'me');

//   // 送信後inputTextを消す
//   setTimeout( () => {
//     inputText.value = '';
//   },1);
// }

//   // BOTの返信回数に応じて
//   switch(count){
//     // もしロボットのトーク数が2個の時に送信ボタンが押されたら、
//         // 名前のやまびこと、chat配列の1が返信
//         case 1:
//             setTimeout( ()=> {
//                 output(chatContents[1], 'robot');
//             }, 2000);
//             break;
        
//         // もしロボットのトーク数が4個の時に送信ボタンが押されたら、
//         // chat配列の2のランダム番目が返信
//         case 3:
//             output(chatContents[2][Math.floor(Math.random() * chatContents[2].length)], 'robot');
//             break;
        
//         // それ以降はやまびこ
//         default:
//             output(inputText.value, 'robot');
//             break;
//   }


//   output(chatContents[0], 'robot');


// // })();

// ロボットの返答内容
const chat = [
  'こんにちは白石麻衣です！',
  'お名前を教えてください！',
  'どんなお悩みを相談されますか？',
  [['うるさい！黙って勉強しろ！'],['黙れ！さっさと勉強しろ']]
];


// ロボットの返信の合計回数（最初は0）
// これを利用して、自分が送信ボタンを押したときの相手の返答を配列から指定する
let chatCount = 0;


// 画面への出力
// valはメッセージ内容，personは誰が話しているか
function output(val, person) {
    // 一番下までスクロール
    const field = document.getElementById('field');
    field.scroll(0, field.scrollHeight - field.clientHeight);
  
    const ul = document.getElementById('chat-ul');
    const li = document.createElement('li');
    // このdivにテキストを指定
    const div = document.createElement('div');
    div.textContent = val;
    
    if (person === 'me') { // 自分
        div.classList.add('chat-right');
        li.classList.add('right');
        ul.appendChild(li);
        li.appendChild(div);
    }else if (person === 'robot') { // 相手
        // ロボットが2個連続で返信してくる時、その間は返信不可にする
        // なぜなら、自分の返信を複数受け取ったことになり、その全てに返信してきてしまうから
        // 例："Hi!〇〇!"を複数など
        // （今回のロボットの連続返信は2個以内とする）
        chatBtn.disabled = true;
        setTimeout( ()=> {
            chatBtn.disabled = false;
            li.classList.add('left');
            div.classList.add('chat-left');
            ul.appendChild(li);
            li.appendChild(div);
            // ロボットのトークの合計数に1足す
            chatCount++;
        }, 2000); 
    }
}


const chatBtn = document.getElementById('chat-button');
const inputText = document.getElementById('chat-input');


// 送信ボタンを押した時の処理
function btnFunc() {
    if (!inputText.value) return false;
    // 自分のテキストを送信
    output(inputText.value, 'me');
  
    setTimeout( ()=> {
        // 入力内を空欄にする
        // 一瞬の間でvalueを取得し、ロボットの"Hi!〇〇!"の返信に利用
        // 送信ボタンを押した瞬間にvalueを消したら、やまびこに失敗した
        inputText.value = '';
    }, 1);
  
    //ロボットの送信の合計回数に応じて次の返信を指定
    switch(chatCount) {
        // もしロボットのトーク数が2個の時に送信ボタンが押されたら、
        // 名前のやまびこと、chat配列の2（3個目）が返信
        case 2:
            output('こんにちは' + inputText.value + 'さん !', 'robot');
            setTimeout( ()=> {
                output(chat[2], 'robot');
            }, 2000);
            break;
        
        // もしロボットのトーク数が4個の時に送信ボタンが押されたら、
        // chat配列の3（4個目）のランダム番目が返信
        case 4:
            output(chat[3][Math.floor(Math.random() * chat[3].length)], 'robot');
            break;
        
        // それ以降はやまびこ
        default:
            output(chat[3][Math.floor(Math.random() * chat[3].length)], 'robot');
            break;
    }
}


// 最初に2つロボットから話しかけられる
output(chat[0], 'robot');

setTimeout( ()=> {
    output(chat[1], 'robot');
}, 1000);

