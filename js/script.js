var answer = [];
var sub = 0;

document.getElementById('stemwijzer').style.display = "none";
document.getElementById('5').style.display = "none";

      function start() {
          var stemwijzer = document.getElementById('stemwijzer');
          document.getElementById('stemwijzer').style.display = "";
          updateSubject();
          document.getElementById('start').style.display = "none";
      }

      function agreeButton(){
        var button = document.getElementById('buttonAgree');
        answer[sub] = 'pro';
        sub++;
        console.log('agree');
        updateSubject();
      }

      function disagreeButton(){
        var button = document.getElementById('buttonDisgree');
        answer[sub] = 'contra';
        sub++;
        console.log('disagree');
        updateSubject();
      }

      function neitherButton(){
        var button = document.getElementById('buttonNeither');
        answer[sub] = 'none';
        sub++;
        console.log('neither');
        updateSubject();
      }

      function skipButton(){
        var button = document.getElementById('buttonSkip');
        answer[sub] = '';
        sub++;
        console.log('skip');
        updateSubject();
      }

      function backButton(){
        var button = document.getElementById('buttonSkip');
        console.log('back');
      }

      function updateSubject(){
          var title = document.getElementById('title');
          var context = document.getElementById('statement');
          var stemwijzer = document.getElementById('stemwijzer');
          var subject = subjects[sub];

          if (typeof subjects[sub] != 'undefined') {
            title.innerHTML = (sub + 1 + ". ") + subject.title;
            context.innerHTML = subject.statement;
          } else {
            title.innerHTML = 'resultaat';
            context.innerHTML = '';
            document.getElementById('btns').style.display = "none";
            matchOpinions();
          }

          // context.innerHTML = subject.statement;
      }

      function matchOpinions() {
        // starting point are my answers
        answer.forEach((answer, answerIndex) => {
          // loop through my answers for current subject
          subjects[answerIndex].parties.forEach((subjectParty, subjectIndex) => {
              //loop through parties
              if (answer == subjectParty.position) {
                // compare my answer to party choice in said subject
                // var party = parties[getParty(subjectParty.name)];
                var currentparty = parties[parties.findIndex(party => party.name == subjectParty.name)];
                // add score to the party that has the same opinion
                // party.name = 'GROENLINKS';
                console.log(currentparty);
                // console.log(parties[getParty(subjectParty.name)]);
                // console.log(subjectParty.name);
              }
          });
        });
      }

      function getParty (partyname) {
        // loop through parties to return matching party id
        parties.forEach((party, i) => {

          if (party.name == partyname) {
            console.log(i);

            return i;
          }
        });
      }
