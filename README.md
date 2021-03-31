# E-commerce Web

(https://lyhshop.cf/)

**`* paypal 결제 = id:[lyh@lyhshop.com] / pw:[lyh12345678]`**

![ezgif com-gif-maker](https://user-images.githubusercontent.com/70849655/113192288-89886100-9299-11eb-9d24-d55357e159e2.gif)

![ezgif com-gif-maker_(1)](https://user-images.githubusercontent.com/70849655/113192381-a2911200-9299-11eb-9f5f-5e17214ea33d.gif)

!![ezgif com-gif-maker_(2)](https://user-images.githubusercontent.com/70849655/113192414-ae7cd400-9299-11eb-9e11-a1873688f179.gif)

# 🕒 성능 테스트

![_2021-04-01__2 44 22](https://user-images.githubusercontent.com/70849655/113192480-c5232b00-9299-11eb-8dad-281ca23a0b3d.png)

![_2021-04-01__2 45 03](https://user-images.githubusercontent.com/70849655/113192508-d10eed00-9299-11eb-9627-825cd3e247ed.png)

❗규모가 큰 이미지 파일이 포함된 콘텐츠를 불러올 때 성능이 감소.

⇒ 이미지 사이즈 최적화 필요

# ⛔ 에러이슈

- http-proxy-middleware 타입스크립트 적용 에러

  서버와 클라이언트와의 ip연결을 위한 proxy설정을 기존 JS파일에서 TS파일로 변환하는 도중

  @types http-proxy-middleware를 설치하여 적용하려 했지만 지원되지 않는다는 에러가 발생.

  그 이유는?

  - node가 타입스크립트를 실행시킬수 없다 ⇒ 자바스크립트로 다시 컴파일하고 실행을 해야할까?
    - http-proxy-middleware의 버젼은 1.0.6이지만 @types의 버젼은 0.19.3이여서 호환이 안될수 있다

  ⇒ 추후에 proxy-middleware의 버젼 호환 불안전성의 이유로, cors 방식을 이용하여 프록시를 설정함.

- server 실행 시 기존 포트가 여전히 열려있어서 실행되지 않는 에러

  nodemon으로 실행시 서버에서 잘못된 코드를 생성하거나 변화가 있을경우 자동으로 패치될 때 already use라는 에러가 발생

  ⇒ kill을 이용하여 강제적으로 서버를 종료하고 재시작하여 해결

- 서버 통신지연 오류 - 504 (Gateway Timeout)

  - 프록시를 통한 클라이언트와 서버간의 통신에서 제 시간안에 요청에 대한 응답을 받지 못한 오류.
  - 원인은 일시적인 네트워크 불안정 문제일 수 있고, 지금 진행하는 프로젝트단에서는 서버 코드 부분에서의 문제일 가능성이 있음.

  ⇒ 서버단에서 가독성을 위해 express의 router를 통해 api호출 폴더를 분할하는 동안 해결.

  일시적인 오류일수도 있고 코드상의 에러가 있었지만, 코드를 재구성하면서 해결이 될 가능성이 있음.

- 이미지 업로드시 이미지 보기 컴포넌트 부분의 404Error

  Node 서버에 이미지와 같은 정적파일을 불러올때는 express의 static 미들웨어 함수를 이용해야함.

  하지만 여기서 중요한 것은 저장폴더의 경로, static의 경로, multer의 destination의 경로, 이 3가지의 경로들이 전부 일치하는지 반드시! 체크해야한다. \*이 단순한 경로확인을 제대로 해주지 않아 몇일동안 애꿎은 다른 코드들을 수정하는 것을 반복했다...

    <img width="393" alt="_2021-02-07__3 08 46" src="https://user-images.githubusercontent.com/70849655/113192565-e126cc80-9299-11eb-9400-d98f661b3593.png">
    
   <img width="273" alt="_2021-02-07__3 09 52" src="https://user-images.githubusercontent.com/70849655/113192602-eab03480-9299-11eb-80b8-73c665293268.png">

  배포 후 업로드된 이미지는 클라우드 스토리지에 저장하도록 패치.

- EmptyActionCreator로서 saga를 호출 시 saga에서 PayloadActionCreator로 인식

  ![_2021-02-18__5 37 18](https://user-images.githubusercontent.com/70849655/113192647-f6036000-9299-11eb-8503-f4a35944e5fe.png)

  로그아웃 액션이 발생될 때 전달해 줄 액션의 payload값이 없기 때문에, request의 payload 타입을 undefined로 설정하여 saga에 액션을 EmptyActionCreator로 전달했지만, saga에서는 unkown을 가지고 있는 payloadActionCreator로 인식하여 타입에러가 발생.

  ⇒ request 타입을 void로 설정하여 payload가 없는 PayloadActionCreator로 전달하여 해결.

- 타입스크립트 인터페이스에 정의되지 않은 동적 타입 할당시 타입 오류

  오류 메시지를 보듯이 기본적으로 인터페이스나 타입Alias는 정의한 속성만 지정할 수 있으므로

  ⇒ 정의된 타입안에 인덱스 시그니처 속성을 any로 선언하여 오류를 출력하지 않음

- useSelector로 데이터를 호출할 때 발생하는 undefined error

  페이지 도입시 데이터를 불러오는 디스패치를 실행 후, useSelector로 데이터를 불러올 때

  데이터 객체안에 있는 또 다른 객체의 속성을 가져오려고 하면 undefined 에러가 발생

  ⇒ 만약 데이터 호출시 값이 한개의 객체라면, 어떤 객체안에 있는 호출하려는 객체를 따로 분리하여, 데이터 호출시 하나의 객체만을 불러오도록 하여 undefined에러를 해결

- NEXT 와 Redux-Saga 연결 시 타입 에러

  디스패치 실행시 REQUEST부터 SUCCESS까지 연속적으로 실행하기 위해서, redux-saga의 {END} 디스패치를 serverSideProps에서 실행해줘야 하는데, 액션타입을 커스텀 Action 타입(Return type typeof customAction)으로 설정해서 END가 없다는 오류가 발생

  ⇒ configureStore의 스토어 타입의 액션을 AnyAction으로 변경하면서 해결.

- 몽고DB의 find메소드 실행시 array 값을 찾지 못하는 에러

  몽고db의 array query operator중 $all을 사용하여 해결

- post API요청시 body값이 객체가 아닐 때 서버에서 처리하지 못하는 에러

  post 메소드 비동기 호출시 payload값이 숫자라면, 객체형태로 주지 않으면 다른 형식(아마 스트링 형식?)으로 전달이 됨.

- 서버에서 new Date()를 이용한 현재 시간을 저장하려고 할때, KOR기준의 시간을 계산한 값이 입력이 안되는 현상

  = 서버 시간이 한국시간과 달라서이다?

  ⇒ 서버단에서 moment라이브러리를 이용하여 해결.

- 배포 후 setCookies 적용이 안되는 현상

  1. 서버와 클라이언트가 다른 도메인을 사용함 ⇒ 하나의 도메인을 생성하여 서브도메인으로 서버 주소를 넣어줌
  2. 하지만 서버의 프로토콜이 http이고, 클라이언트는 https여서 클라이언트에서 request를 요청할 수 없음

     - 해결책

     1. 서버의 프로토콜을 https로 설정 ⇒ 이 설정은 서버 배포를 한 사이트에서 유료로 제공하는 서비스여서 보류함
     2. 클라이언트 프로토콜을 http로 설정 ⇒ 배포한 사이트에서 자동으로 https 프로토콜로 설정되서

        프로토콜을 설정할 수 있는 aws ec2를 이용하려 했지만, 무료 이용량을 초과하면 요금을 부과하는 정책이 있어서, 실제 서비스를 제공하는 사이트가 아니므로 보류함

     - 결론

       실제 운영하는 서비스를 제공하는 사이트가 아니므로, 쿠키를 전달하지 않는 대신 샘플 계정으로 로그인을 유지하여 사이트를 이용할 수 있도록 결정.

# 🛠️ 스택

## Front

> Typescript-react

> Material-Ul & styled-components

- Why❓
  - 페이지 레이아웃 컨테이너들은 클래스네임과 태그를 따로 설정하지 않아도 되는 CSS IN JS 방식으로 채택.
  - 컴포넌트의 수와 사용자와의 인터랙션 부분들이 많고, 반복적으로 사용되는 css는 시간적 기회비용과 프로덕트 생산성을 위해 CSS 프레임워크 사용
  - 편리한 커스터마이징과 타입스크립트기반의 CSS를 지원하기 때문에, 프레임워크로 Material UI를 채택

> Redux & Redux-saga

- Why❓

  - 프로젝트 진행 초반에는 데이터 규모, 데이터API호출의 개수가 적고, 컴포넌트단에서 액션에 바로 비동기작업을 처리하는 방식이 직관적이고 불필요한 작업을 최소화한다고 판단하여 실행했지만, 추후 규모가 커질 것을 대비해 여러가지의 상태와 많은 비동기 작업을 전역차원에서 관리하고 처리할 수 있는 것이 중요하다고 판단하여 saga를 프로젝트 진행 중간 과정에서 적용시키로 결정.

    > reducer,saga 커스텀 유틸 사용

    - 반복적인 패턴의 리듀서는 loading,success,failure 패턴의 유틸을 이용하여 코드량을 줄이고 코드의 시각적 측면에서 도움을 줌.
    - saga또한 반복적으로 사용되는 하나의 비동기 호출과 액션 호출의 패턴은 유틸로 만들어 효율적 코드를 생산.

> NextJS

- Why❓

  프로젝트를 SPA기반의 서비스를 도입하려 했지만, 빠르고 효율적인 검색엔진 최적화, 데이터 호출을 하는데 있어 SSR방식의 랜더링이 필요하다고 판단하여 프로젝트를 다시 NextJS 환경의 프로젝트로 수정

## Backend

> NodeJs & Express

> MongoDB

## 📌 사용자의 좋은 경험을 위한 고찰

- next-dynamic ⇒ 배포 후 성능을 측정하면서 번들사이즈가 크면 dynamic으로 코드를 스플릿하려 했지만 각 페이지 번들마다 사용자가 사이트를 이용하는데 크게 지장이 없어서 보류.
- 로그인을 시도할 때 이메일이 잘못되었거나 비밀번호가 틀렸을 때 단순히 "로그인이 실패했습니다"라고 알람을 주었지만, 사용자가 명확한 원인을 알 수 있도록 "해당하는 이메일이 없습니다" 또는 "비밀번호가 틀렸습니다"로 수정.

> 상태관리 성능 최적화

- reselect 사용 - 데이터 업데이트가 되지 않은 컴포넌트의 불필요한 리랜더링 방지.
  - selector는 사용하고 있는 현재의 값을 caching 하거나 저장하여 사용.
