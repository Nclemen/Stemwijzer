var answer = [];
var sub = 0;

document.getElementById('stemwijzer').style.display = "none";
document.getElementById('5').style.display = "none";

      /**
       * hides the start screen and shows question screen and triggers the updateSubject function.
       *
       *
       */
      function start() {
          var stemwijzer = document.getElementById('stemwijzer');
          document.getElementById('stemwijzer').style.display = "";
          document.getElementById('5').style.display = "";
          updateSubject();
          document.getElementById('start').style.display = "none";
      }

      /**
       * saves choice in array, increases sub variable by one and triggers updateSubject function.
       */
      function agreeButton(){
        var button = document.getElementById('buttonAgree');
        answer[sub] = 'pro';
        subjects[sub].important = document.getElementById('myCheck').checked;
        sub++;
        console.log('agree');
        updateSubject();
      }

      /**
       * saves choice in array, increases sub variable by one and triggers updateSubject function.
       */
      function disagreeButton(){
        var button = document.getElementById('buttonDisgree');
        answer[sub] = 'contra';
        subjects[sub].important = document.getElementById('myCheck').checked;
        sub++;
        console.log('disagree');
        updateSubject();
      }

      /**
       * saves choice in array, increases sub variable by one and triggers updateSubject function.
       */
      function neitherButton(){
        var button = document.getElementById('buttonNeither');
        answer[sub] = 'none';
        subjects[sub].important = document.getElementById('myCheck').checked;
        sub++;
        console.log('neither');
        updateSubject();
      }

      /**
       * saves choice in array, increases sub variable by one and triggers updateSubject function.
       */
      function skipButton(){
        var button = document.getElementById('buttonSkip');
        sub++;
        console.log('skip');
        updateSubject();
      }

      /**
       * decreases sub variable if sub does not equal 0 and triggers updateSubject function.
       */
      function backButton(){
        var button = document.getElementById('5');
        if (sub != 0) {
          sub--;
          console.log('back');
          updateSubject();
        } else {
          var stemwijzer = document.getElementById('stemwijzer');
          var start = document.getElementById('start');
          stemwijzer.style.display = "none";
          document.getElementById('5').style.display = "none";
          start.style.display = "";
        }
      }
      /**
       * updates statement shown based on the variable sub.
       */
      function updateSubject(){
          var title = document.getElementById('title');
          var context = document.getElementById('statement');
          var stemwijzer = document.getElementById('stemwijzer');
          var subject = subjects[sub];
          var checkbox = document.getElementById('myCheck');

          if (typeof subjects[sub] != 'undefined') {
            title.innerHTML = (sub + 1 + ". ") + subject.title;
            context.innerHTML = subject.statement;
            document.getElementById('btns').style.display = "";
            document.getElementById('importanceChecker').style.display = "";
            document.getElementById('filter').style.display = "none";
          } else {
            title.innerHTML = 'resultaat';
            context.innerHTML = '';
            document.getElementById('btns').style.display = "none";
            document.getElementById('importanceChecker').style.display = "none";
            document.getElementById('filter').style.display = "";
            matchOpinions();
          }
          checkbox.checked = false;
          selectionHighlighter();
      }

      /**
       * shows what you choose previously.
       */
      function selectionHighlighter () {
        console.log('running selectionHighlighter answer = ' + answer[sub]);
        switch (answer[sub]) {
          case 'pro':
          document.getElementById('1').className = 'btn btn-success';
          document.getElementById('2').className = 'btn btn-primary';
          document.getElementById('3').className = 'btn btn-primary';
            break;
          case 'contra':
          document.getElementById('1').className = 'btn btn-primary';
          document.getElementById('2').className = 'btn btn-primary';
          document.getElementById('3').className = 'btn btn-success';
            break;
          case 'none':
          document.getElementById('1').className = 'btn btn-primary';
          document.getElementById('2').className = 'btn btn-success';
          document.getElementById('3').className = 'btn btn-primary';
            break;
          default:
          document.getElementById('1').className = 'btn btn-primary';
          document.getElementById('2').className = 'btn btn-primary';
          document.getElementById('3').className = 'btn btn-primary';
      }
      }

      /**
       * matches your opinions with those of the parties on all subjects based on the answers you've given and gives parties points if opinions match and triggers showResult function.
       */
      function matchOpinions() {
        var partiesByOrder;


        parties.forEach((party, index) => {
          party.points = 0;
        });
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
                currentparty.points++;
                // add extra point to party if user thinks that the statement is important
                if (subjects[answerIndex].important) {
                  currentparty.points++;
                  console.log(currentparty.name + 'got an extra point for subject' + answerIndex);
                }
              }
          });
        });
        showResult();
      }

      /**
       *shows parties in order of most points and filters them on whether or not they're secular or has more seats than the amoutn specified in the filter.
       */
      function showResult (){
        var container = document.createElement("OL");
        var filterSeculier = document.getElementById('seculierinputGroupSelect01').value;
        var filterZetels = document.getElementById('zetelGroupSelect01').value;
        var partijen = parties;
        document.getElementById("statement").innerHTML = '';
        console.log('showing results');

        partijen.sort((a, b) => {
          return b.points - a.points;
        });

        if (filterSeculier != 'Choose...') {
          console.log('filtering secular');
          console.log(partijen);
          partijen = partijen.filter(checkSeculier);
          console.log(partijen);
        }

        if (filterZetels != 'Choose...') {
          partijen = partijen.filter(checkZetels);
        }

        partijen.forEach((party, i) => {
          var node = document.createElement("LI");
          var textnode = document.createTextNode(party.name);
          node.appendChild(textnode);
          container.appendChild(node);
        });
        document.getElementById("statement").appendChild(container);
      };


      /**
      * checks if parties are secular
      * @param {object} partij - the party that is being checked on being secular
      * @return {boolean} - true if party is secular; false if party not secular
      */
      function checkSeculier(partij) {
        if (document.getElementById('seculierinputGroupSelect01').value === 'true') {
          var filterValue = true;
        } else {
          var filterValue = false;
        }

          return partij.secular === filterValue;
      }

      function checkZetels(partij) {
        return partij.size >= document.getElementById('zetelGroupSelect01').value;
      }
