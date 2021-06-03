# tdd_lecture

* 인프런 강의 따라하며 배우는 TDD 개발
* TDD (Test Driven Development)
* Unit Test
  - 모듈 단위 테스트
  - 메소드를 테스트하는 다른 메소드
  - 독립적이어야 함 (다른 테스트에 의존 X)
  - Ajax, Axios, LocalStorage등 테스트 대상이 의존하는 것을 다른 것으로 대체해야 함
* Jest
  - facebook에서 만든 테스팅 프레임 워크
  - Unit Test 이용
* jest.fn() 
  - Mock 함수를 생성하는 함수
  - 코드가 의존하는 부분을 가짜로 대체하는 일을 함
  - jest.fn()이 생성한 가짜 함수는 이 함수에 어떤 일들이 발생했는지, 다른 코드들에 의해서 어떻게 호출되는지 기억함
 
