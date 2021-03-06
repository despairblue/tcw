var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

function preload () {

    game.load.image('imgCh1Background', 'assets/chap1_background.jpg');

    game.load.image('imgSascha', 'assets/sascha.png');
    game.load.image('imgEmmanuel', 'assets/emmanuel.png');
    game.load.image('imgJenny', 'assets/jenny.png');
    game.load.image('imgMarius', 'assets/marius.png');
    game.load.image('imgMarlene', 'assets/marlene.png');

    game.load.image('imgSaschaHead', 'assets/saschaHead.png');
    game.load.image('imgEmmanuelHead', 'assets/emmanuelHead.png');
    game.load.image('imgJennyHead', 'assets/jennyHead.png');
    game.load.image('imgMariusHead', 'assets/mariusHead.png');
    game.load.image('imgMarleneHead', 'assets/marleneHead.png');

    game.load.image('imgTable', 'assets/table.png');

    game.load.image('bubble1', 'assets/speach_bubble1.png');
	game.load.image('bubble2', 'assets/speach_bubble2.png');

    game.load.image('imgStartAllSmall', 'assets/alle.png');
	game.load.image('imgStartAsk', 'assets/ask.png');
	game.load.image('imgStartTrophy', 'assets/trophy.png');

	game.load.image('imgSmallTrophy', 'assets/trophy_small.png');
	game.load.image('imgSmallTimer', 'assets/timer.png');

	game.load.spritesheet('buttonStart', 'assets/start.png',87,0);
    game.load.spritesheet('button1', 'assets/arrow_next.png',71,0);

    game.load.image('smallAnswerButton', 'assets/smallAnswerButton.png');
	game.load.spritesheet('bigAnswerButton', 'assets/large_button.png',125,0);

}

//Bilder
var sascha;
var marlene;
var emmanuel;
var jenny;
var marius;


//Start-Page
var instruction_1;
var instruction_2;
var instruction_3;

var instruction_text_1
var instruction_text_2
var instruction_text_3

var smallTrophy;
var timerPic;

var style = { font: "18px Segopr", fill: "#000000", align: "left" };
var text_1;
var text_2;


//Arrays in dem alle Attribute gespeichert werden
var table = new Array(5);

var names = new Array(15);
var ages = new Array(25);
var jobsm = new Array(15);
var jobsw = new Array(15);
var sports = new Array(20);
var launches = new Array(10);
var hobbies = new Array(15);
var dinners = new Array(10);
var infosm = new Array(15);
var infosw = new Array(15);
var ph2questions = new Array(10);


// game Parameter
var timeForAnswer = 15;
var questionSolvedFirstStep = 30;
var questionSolvedSecondStep = 25;
var pointsPerSecondLeft = 1;
var questionsAsked = 10;
var pointsPh2Question = 30;


// Vars Phase 1
var gamePoints = 0;
var gameProgress = 0;
var attrCounter = 0;
var phase = 1;
var introducedAttributes = 0;
var tempCharNo;
var tempCharCount;
var questOrAttCount = 0;
var questCount = 0;
var lastQuestionChar = 0;
var lastQuestionAttr = 0;
var buttonArray = new Array(6);
var timeLeft;
var timeLeftTimer;

//Vars Phase 2
var ph2questionCount = 0;



function create () {

    var background = game.add.sprite(game.world.centerX, game.world.centerY, 'imgCh1Background');
	background.anchor.setTo(0.5, 0.5);

	instruction_1 = game.add.sprite(80, 170, 'imgStartAllSmall');
	instruction_2 = game.add.sprite(390, 152, 'imgStartAsk');
	instruction_3 = game.add.sprite(610, 180, 'imgStartTrophy');

	instruction_text_1 = game.add.text(130, 300 , "Merke dir was die\n Leute erzählen!", style);
	instruction_text_2 = game.add.text(335, 300 , "Beantworte die Fragen\n richtig...", style);
	instruction_text_3 = game.add.text(565, 300 , "... und das in möglichst\n kurzer Zeit.", style);

    startbutton = game.add.button(game.world.centerX-40, 450, 'buttonStart', startGame, 0, 1 , 0, 1);

    solutionButton1 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this, 1 ,0, 1, 0);
    solutionButton1.name = 1;
	solutionButton1.answer = false;
	solutionButton1.visible = false;

	solutionButton2 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this, 1 ,0 , 1, 0);
	solutionButton2.name = 2;
	solutionButton2.answer = false;
	solutionButton2.visible = false;

	solutionButton3 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this, 1 ,0, 1, 0);
	solutionButton3.name = 3;
	solutionButton3.answer = false;
	solutionButton3.visible = false;

	solutionButton4 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this ,1 ,0, 1, 0);
	solutionButton4.name = 4;
	solutionButton4.answer = false;
	solutionButton4.visible = false;

	solutionButton5 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this ,1 ,0, 1, 0);
	solutionButton5.name = 5;
	solutionButton5.answer = false;
	solutionButton5.visible = false;

	solutionButton6 = game.add.button(0, 0, 'smallAnswerButton', checkSolution, this ,1 ,0, 1, 0);
	solutionButton6.name = 6;
	solutionButton6.answer = false;
	solutionButton6.visible = false;


    text = game.add.text(game.world.centerX + 50, game.world.centerY - 200, "dasd", style);
    text.visible = false;

    questionsText = game.add.text(750, 40, "", style);
    ph2QuestionText = game.add.text(200, 320, "", style);
    ph2SolutionText = game.add.text(200, 400, "", style);
    ph2SolutionText2 = game.add.text(200, 500, "", style);


    timeLeftText = game.add.text(550, 25, "", style);
    timeLeftText.visible = false;

	timeLeftTimer = game.time.create(false);
   	timeLeftTimer.loop(1000, decTimeLeft, this);
   	timeLeftTimer.start();

	sascha = game.add.sprite(540, 120, 'imgSascha');
	marlene = game.add.sprite(130, 140, 'imgMarlene');
	emmanuel = game.add.sprite(130, 140, 'imgEmmanuel');
	jenny = game.add.sprite(540, 140, 'imgJenny');
	marius = game.add.sprite(130, 140, 'imgMarius');

	saschaHead = game.add.button(300, 400, 'imgSaschaHead', ph2CheckSolution, this,1 ,0, 1, 0);
	saschaHead.name = 'sascha';
	marleneHead = game.add.button(200, 400, 'imgMarleneHead', ph2CheckSolution, this,1 ,0, 1, 0);
	marleneHead.name = 'marlene';
	emmanuelHead = game.add.button(100, 400, 'imgEmmanuelHead', ph2CheckSolution, this,1 ,0, 1, 0);
	emmanuelHead.name = 'emmanuel';
	jennyHead = game.add.button(400, 400, 'imgJennyHead', ph2CheckSolution, this,1 ,0, 1, 0);
	jennyHead.name = 'jenny';
	mariusHead = game.add.button(500, 400, 'imgMariusHead', ph2CheckSolution, this,1 ,0, 1, 0);
	mariusHead.name = 'marius';

	table = game.add.sprite(30, 30, 'imgTable');
	table.visible = false;

	marius.visible = false;
	jenny.visible = false;
	emmanuel.visible = false;
	marlene.visible = false;
	sascha.visible = false;

	mariusHead.visible = false;
	mariusHead.input = false;
	jennyHead.visible = false;
	jennyHead.input = false;
	emmanuelHead.visible = false;
	emmanuelHead.input = false;
	marleneHead.visible = false;
	marleneHead.input = false;
	saschaHead.visible = false;
	saschaHead.input = false;


	bubble1_1 = game.add.sprite(230, 60, 'bubble1');
	bubble1_1.visible = false;

	bubble1_2 = game.add.sprite(140, 60, 'bubble2');
	bubble1_2.visible = false;

	text_1 = game.add.text(315, 115, "Ich heiße Marius", style);
    text_1.visible = false;

	text_2 = game.add.text(195, 110, "Ich heiße Marius", style);
    text_2.visible = false;

    timerPic = game.add.sprite(517, 13, 'imgSmallTimer');
	timerPic.visible = false;

	timeLeftText = game.add.text(550, 20, "", style);
    timeLeftText.visible = false;

	for (var i = 0; i < 5; ++i){
			table[i] = new Array(9);
			table[i][0] = 0;

			for(var p = 1; p < 9; ++p){
				table[i][p] = new Array(3);
				table[i][p][1] = 0;
				table[i][p][2] = 0;
			}

	}

	table[0][1][0] = 'Emmanuel';
	table[0][2][0] = getRandomInt(20,24);
	table[0][3][0] = 'Informatiker';
	table[0][4][0] = 'Robotorkämpfe';
	table[0][5][0] = 'Kantine';
	table[0][6][0] = 'Nachtwandern';
	table[0][7][0] = 'Fertiggerichte';
	table[0][8][0] = 'Technikfreak';

	table[1][1][0] = 'Marlene';
	table[1][2][0] = getRandomInt(25,29);
	table[1][3][0] = 'Mathelehrerin';
	table[1][4][0] = 'Reiten';
	table[1][5][0] = 'Kantine';
	table[1][6][0] = 'Cosplay';
	table[1][7][0] = 'Selbstgekochtes';
	table[1][8][0] = 'Prinzessin';

	table[2][1][0] = 'Sascha';
	table[2][2][0] = getRandomInt(30,36);
	table[2][3][0] = 'Versicherungsvertreter';
	table[2][4][0] = 'Tanzen';
	table[2][5][0] = 'Restaurant';
	table[2][6][0] = 'Theater';
	table[2][7][0] = 'Selbstgekochtes';
	table[2][8][0] = 'Leitungswassertrinker';

	table[3][1][0] = 'Jenny';
	table[3][2][0] = getRandomInt(24,28);
	table[3][3][0] = 'Mutter';
	table[3][4][0] = 'Yoga';
	table[3][5][0] = 'Selbstgekochtes';
	table[3][6][0] = 'Basteln';
	table[3][7][0] = 'Selbstgekochtes';
	table[3][8][0] = 'Kompost';

	table[4][1][0] = 'Marius';
	table[4][2][0] = getRandomInt(18,19);
	table[4][3][0] = 'Getränkemarkt';
	table[4][4][0] = 'Schützenverein';
	table[4][5][0] = 'Lieferservice';
	table[4][6][0] = 'Fuballspiele';
	table[4][7][0] = 'Fertiggericht';
	table[4][8][0] = 'Glasflaschentrinker';

	names[0] = 'Emmanuel';
	names[1] = 'Marlene';
	names[2] = 'Sascha';
	names[3] = 'Jenny';
	names[4] = 'Marius';
	names[5] = 'Anne';
	names[6] = 'Bene';
	names[7] = 'Dennis';
	names[8] = 'Stefan';
	names[9] = 'Kilian';
	names[10] = 'Alexander';
	names[11] = 'Philipp';
	names[12] = 'Neo';
	names[13] = 'Luan';
	names[14] = 'Huy';

	jobsm[0] = 'Informatiker';
	jobsm[1] = 'Mathelehrer';
	jobsm[2] = 'Versicherungsvertreter';
	jobsm[3] = 'Vater';
	jobsm[4] = 'Getränkemarkt';
	jobsm[5] = 'Zugführer';
	jobsm[6] = 'Kindergärtner';
	jobsm[7] = 'Arzt';
	jobsm[8] = 'Anwalt';
	jobsm[9] = 'Gärtner';
	jobsm[10] = 'Fleischer';
	jobsm[11] = 'Englischlehrer';
	jobsm[12] = 'Friseur';
	jobsm[13] = 'Richter';
	jobsm[14] = 'Kellner';

	jobsw[0] = 'Informatikerin';
	jobsw[1] = 'Mathelehrerin';
	jobsw[2] = 'Versicherungsvertreterin';
	jobsw[3] = 'Mutter';
	jobsw[4] = 'Getränkemarkt';
	jobsw[5] = 'Zugführerin';
	jobsw[6] = 'Kindergärtnerin';
	jobsw[7] = 'Ärztin';
	jobsw[8] = 'Anwältin';
	jobsw[9] = 'Gärtnerin';
	jobsw[10] = 'Fleischerin';
	jobsw[11] = 'Englischlehrerin';
	jobsw[12] = 'Friseurin';
	jobsw[13] = 'Richterin';
	jobsw[14] = 'Kellnerin';

	ages[0] = '18';
	ages[1] = '16';
	ages[2] = '20';
	ages[3] = '21';
	ages[4] = '22';
	ages[5] = '23';
	ages[6] = '24';
	ages[7] = '25';
	ages[8] = '26';
	ages[9] = '27';
	ages[10] = '28';
	ages[11] = '29';
	ages[12] = '30';
	ages[13] = '31';
	ages[14] = '32';
	ages[15] = '33';
	ages[16] = '34';
	ages[17] = '35';
	ages[18] = '36';
	ages[19] = '37';
	ages[20] = '38';
	ages[21] = '39';
	ages[22] = '40';
	ages[23] = '17';
	ages[24] = '16';

	sports[0] = 'Nachtwandern';
	sports[1] = 'Reiten';
	sports[2] = 'Tanzen';
	sports[3] = 'Zielschießen';
	sports[4] = 'Computerspielen';
	sports[5] = 'Pilates';
	sports[6] = 'Fussballspielen';
	sports[7] = 'Basketballspielen';
	sports[8] = 'Wettschwimmen';
	sports[9] = 'Fitnesstraining';
	sports[10] = 'Snowboarden';
	sports[11] = 'Klettern';
	sports[12] = 'Nichts';
	sports[13] = 'Joggen';
	sports[14] = 'Parkour-laufen';
	sports[15] = 'Gewichtheben';
	sports[16] = 'Kunstturnen';
	sports[17] = 'Tischtennisspielen';
	sports[18] = 'Breakdancen';
	sports[19] = 'Kickboxen';

	launches[0] = 'Kantine';
	launches[1] = 'Restaurant';
	launches[2] = 'Selbstgekochtes';
	launches[3] = 'Lieferservice';
	launches[4] = 'MCDonalds';
	launches[5] = 'Nichts';
	launches[6] = 'Milchschnitten';
	launches[7] = 'Smoothie';
	launches[8] = 'Bananen';
	launches[9] = 'Schokolade';

	hobbies[0] = 'Robotorkämpfe';
	hobbies[1] = 'Cosplay';
	hobbies[2] = 'Basteln';
	hobbies[3] = 'Fussballspiele';
	hobbies[4] = 'Ritterspiele';
	hobbies[5] = 'Fotografieren';
	hobbies[6] = 'Zeichnen';
	hobbies[7] = 'Lernen';
	hobbies[8] = 'Blumen';
	hobbies[9] = 'Freunde';
	hobbies[10] = 'Nichts';
	hobbies[11] = 'Schlafen';
	hobbies[12] = 'Spanisch';
	hobbies[13] = 'Kochen';
	hobbies[14] = 'Musik';

	dinners[0] = 'Selbstgekochtes';
	dinners[1] = 'Fertiggerichte';
	dinners[2] = 'Restaurant';
	dinners[3] = 'Nichts';
	dinners[4] = 'Milchshakes';
	dinners[5] = 'Lieferservice';
	dinners[6] = 'Brot';
	dinners[7] = 'Selbstgekochtes';
	dinners[8] = 'Selbstgekochtes';
	dinners[9] = 'Selbstgekochtes';

	infosm[0] = 'Leitungswassertrinker';
	infosm[1] = 'Glasflaschentrinker';
	infosm[2] = 'Blumenflücker';
	infosm[3] = 'Geschenkpapierwiederverwerter';
	infosm[4] = 'Langschläfer';
	infosm[5] = 'Kaffeetrinker';
	infosm[6] = 'Raucher';
	infosm[7] = 'Frauenversteher';
	infosm[8] = 'RockNRoller';
	infosm[9] = 'Klassensprecher';
	infosm[10] = 'Komiker';
	infosm[11] = 'Leitungswassertrinker';
	infosm[12] = 'Leitungswassertrinker';
	infosm[13] = 'Leitungswassertrinker';
	infosm[14] = 'Leitungswassertrinker';

	infosw[0] = 'Leitungswassertrinkerin';
	infosw[1] = 'Glasflaschentrinkerin';
	infosw[2] = 'Blumenflückerin';
	infosw[3] = 'Geschenkpapierwiederverwerterin';
	infosw[4] = 'Langschläferin';
	infosw[5] = 'Kaffeetrinkerin';
	infosw[6] = 'Raucherin';
	infosw[7] = 'Frauenversteherin';
	infosw[8] = 'RockNRollerin';
	infosw[9] = 'Klassensprecherin';
	infosw[10] = 'Komikerin';
	infosw[11] = 'Leitungswassertrinkerin';
	infosw[12] = 'Leitungswassertrinkerin';
	infosw[13] = 'Leitungswassertrinkerin';
	infosw[14] = 'Leitungswassertrinkerin';

	ph2questions[0] = 'Wer produziert besonders viel Elektromüll?';
	ph2questions[1] = 'Bei wem bleibt besonders viel Verpackungsmüll über?';
	ph2questions[2] = 'Wer produziert besonders viel Stoffmüll/Papiermüll?';
	ph2questions[3] = 'Bei wem wird besonders viel Glasmüll produziert?';
	ph2questions[4] = 'Wer verbraucht besonders viele Glühbirnen und Batterien?';
	ph2questions[5] = 'Wer produziert besonders wenig Restmüll?';
	ph2questions[6] = 'Bei wem werden besonders wenig Flaschen verbraucht?';
	ph2questions[7] = 'XXX?';
	ph2questions[8] = 'XXX?';
	ph2questions[9] = 'XXX';

}

function startGame() {
	var charNo = getNextCharInt();
	tempCharNo = charNo;
	tempCharCount = 1;
	startbutton.input = false;
	startbutton.visible = false;

	instruction_1.visible = false;
	instruction_2.visible = false;
	instruction_3.visible = false;

	instruction_text_1.visible = false;
	instruction_text_2.visible = false;
	instruction_text_3.visible = false;

	smallTrophy = game.add.sprite(720, 15, 'imgSmallTrophy');

	pointsText = game.add.text(750, 20, "", style);
    pointsText.setText(gamePoints);
    questionsText.visible = true;
    questionsText.setText(questCount);
	if(charNo == 2 || charNo == 3)
	{
		bubble1_1.visible = false;
		bubble1_2.visible = true;
	}
	else
	{
		bubble1_2.visible = false;
		bubble1_1.visible = true;
	}


	gameButton = game.add.button(650, 500, 'button1', gameForward, 0, 1 , 0, 1);

	attributeString = introduceNewAttributes(charNo);
	if(charNo == 2 || charNo == 3)
	{
		text_2.setText(attributeString);
		text_1.visible = false;
		text_2.visible = true;
	}
	else
	{
		text_1.setText(attributeString);
		text_2.visible = false;
		text_1.visible = true;
	}
}

function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getNextCharInt(){
	var min = table[0][0];
	var charNo = 0;
	var possible = new Array();
	for (var i = 1; i < 5; i++){
		if(table[i][0] < min){ min = table[i][0];}
	}

	for (var i = 0; i < 5; i++){
		if(table[i][0] == min){
			possible[possible.length] = i;
		}
	}
	charNo = possible[getRandomInt(0,possible.length-1)];

	return charNo;
}

function showCharImg(charNo){
	marius.visible = false;
	jenny.visible = false;
	emmanuel.visible = false;
	marlene.visible = false;
	sascha.visible = false;

	switch (charNo)
	{
		case 0:
			emmanuel.visible = true;
			break;
		case 1:
			marlene.visible = true;
			break;
		case 2:
			sascha.visible = true;
			break;
		case 3:
			jenny.visible = true;
			break;
		case 4:
			marius.visible = true;
			break;
	}

	if(charNo == 2 || charNo == 3)
	{
		bubble1_1.visible = false;
		bubble1_2.visible = true;
	}
	else
	{
		bubble1_2.visible = false;
		bubble1_1.visible = true;
	}
}

function introduceNewAttributes(charNo){
	gameProgress++;
	attrCounter++;
	showCharImg(charNo);
	var attrNo = 0;
	if(table[charNo][0] == 0){
		attrNo = 1;
		table[charNo][0]++;
		table[charNo][attrNo][1] = 1;
		table[charNo][attrNo][2]++;
	}
	else{
		var possible = new Array();
		for(i=2; i < 9; i++){
			if(table[charNo][i][1] == 0){
				possible[possible.length] = i;
			}
		}
		attrNo = possible[getRandomInt(0,possible.length-1)];
		table[charNo][attrNo][1] = 1;
	}
	table[charNo][0]++;
	return getAttributeString(charNo, attrNo);

}

function addNewLineAtSpace(string, maxRowLength){
	var stringNoCount = 0;
	var strings = string.split(' ');
	var finalString = '';
	var lineCounter = 0;

	while(stringNoCount != strings.length){
		if(finalString.length + strings[stringNoCount].length - lineCounter*maxRowLength < maxRowLength){
			finalString = finalString + ' ' + strings[stringNoCount];
			stringNoCount++;
		}
		else{
			finalString = finalString + '\n' + strings[stringNoCount];
			lineCounter++;
			stringNoCount++;
		}
	}

	return finalString;

}

function introduceNewQuestion(){
	var charNo = 0;
	var attrNo = 0;
	var possible = new Array();
	var min;
	var questionString;
	var randNo;
	var counter = 0;

	gameProgress++;
	questCount++;
	questionsText.setText(questCount + '/' + questionsAsked);

	for(i = 0; i < 5; i++){
		for(p = 1; p < 9; p++){
			if(table[i][p][1]){
				min = table[i][p][2];
			}
		}
	}

	for(i = 0; i < 5; i++){
		for(p = 1; p < 9; p++){
			if(table[i][p][1]){
				if( table[i][p][2] < min){
					min = table[i][p][2];
				}
			}
		}
	}

	for(i = 0; i < 5; i++){
		for(p = 1; p < 9; p++){
			if(table[i][p][1]){
				if( table[i][p][2] == min || table[i][p][2] == min ){ // evtl. min+1 fuer etwas mehr Vielfalt bei den Fragen und hoehere Schwierigkeit
					var arr = new Array();
					arr[0] = i;
					arr[1] = p;
					possible[counter] = arr;
					counter++;
				}
			}
		}
	}
	randNo = getRandomInt(0,possible.length-1);
	arr = possible[randNo];

	if(arr[0] == lastQuestionChar && arr[1] == lastQuestionAttr){
		if(randNo == possible.length-1){
			randNo = 0;
		}
		else{
			randNo++;
		}
		arr = possible[randNo];
	}

	lastQuestionChar = arr[0];
	lastQuestionAttr = arr[1];
	table[arr[0]][arr[1]][2]++;

	showCharImg(arr[0]);

	switch (arr[1]) {
	case 1:
	    questionString = "Wie heiße ich?";
	    break;
	case 2:
	    questionString = "Wie alt bin ich?";
	    break;
	case 3:
	    questionString = "Als was bzw. wo arbeite ich noch?";
	    break;
	case 4:
	    questionString = "Welchen Sport übe ich aus?";
	    break;
	case 5:
	    questionString = "Was esse ich gewöhnlich zu Mittag?";
	    break;
	case 6:
	    questionString = "Was hab ich noch für ein Hobby?";
	    break;
	case 7:
	    questionString = "Was esse ich gewöhnlich zu Abend?";
	    break;
	case 8:
	    questionString = "Was hab ich dir spezielles über mich erzählt?";
	    break;
	    }
	questionString = addNewLineAtSpace(questionString,40);
	createSmallButtons(arr[0], arr[1]);

	solutionButton1.input = true;
	solutionButton1.visible = true;

	if(arr[0] == 2 || arr[0] == 3)
	{
		text_2.setText(questionString);
		text_1.visible = false;
		text_2.visible = true;
	}
	else
	{
		text_1.setText(questionString);
		text_2.visible = false;
		text_1.visible = true;
	}

}

function createSmallButtons(charNo, attrNo){
	var solutionString;
	var fillerString;
	var randNo;
	var flag = 0;
	var xPos;
	var yPos;

	gameButton.visible = false;
	gameButton.input = false;


	for(i = 0; i < 6; i++){
		var buttonValues = new Array(3);
		buttonValues[0] = 0;
		buttonValues[1] = 0;
		buttonValues[2] = 0;
		buttonArray[i] = buttonValues;
	}


	solutionString = table[charNo][attrNo][0];
	randNo = getRandomInt(1,6);

	buttonArray[0][0] = solutionString;
	buttonArray[0][1] = 1;
	buttonArray[0][2] = randNo;

	if(attrNo == 1){//namen
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,14);
			fillerString = names[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,14);
				fillerString = names[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 2){//alter
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,24);
			fillerString = ages[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,24);
				fillerString = ages[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0] == fillerString){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 3){//job
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,14);
			if(charNo == 1 || charNo == 3){
				fillerString = jobsw[randNo];
			}
			else{
				fillerString = jobsm[randNo];
			}
			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,14);
				if(charNo == 1 || charNo == 3){
					fillerString = jobsw[randNo];
				}
				else{
					fillerString = jobsm[randNo];
				}

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 4){//sport
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,19);
			fillerString = sports[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,19);
				fillerString = sports[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}


	if(attrNo == 5){//mittag
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,9);
			fillerString = launches[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,9);
				fillerString = launches[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 6){//hobby
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,14);
			fillerString = hobbies[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,14);
				fillerString = hobbies[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 7){//abendessen
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,9);
			fillerString = dinners[randNo];

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,9);
				fillerString = dinners[randNo];

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	if(attrNo == 8){
		for(i = 1; i < buttonArray.length; i++){
			randNo = getRandomInt(0,14);
			if(charNo == 1 || charNo == 3){
				fillerString = infosw[randNo];
			}
			else{
				fillerString = infosm[randNo];
			}
			while(flag == 0){
				flag=1;
				randNo = getRandomInt(0,14);
				if(charNo == 1 || charNo == 3){
					fillerString = infosw[randNo];
				}
				else{
					fillerString = infosm[randNo];
				}

				for(p = 0; p < buttonArray.length-1; p++){
					if(buttonArray[p][0] != 0 && buttonArray[p][0].charAt(0) == fillerString.charAt(0)){
						flag = 0;
					}
				}
			}
			flag = 0;


			buttonArray[i][0] = fillerString;
			buttonArray[i][1] = 0;

			while(flag == 0){
				flag=1;
				randNo = getRandomInt(1,6);
				for(p = 0; p < buttonArray.length; p++){
					if(buttonArray[p][2] == randNo){
						flag = 0;
					}
				}
			}
			flag = 0;
			buttonArray[i][2] = randNo;
		}
	}

	var solButtonStyle = { font: "20px Arial", fill: "#ff0044", align: "center" };

	var textXAdd = 25;
	var textYAdd = 12;

	xPos = getSolButtonX(buttonArray[0][2], 0);
	yPos = getSolButtonY(buttonArray[0][2], 0);
	solutionButton1.loadTexture('smallAnswerButton', 0 ,1);
	solutionButton1.reset(xPos,yPos);
	solutionButton1.answer = true;
	solutionButton1.answerNo = 1;
	solutionButton1.charNo = charNo;
	solutionButton1.attrNo = attrNo;
	solutionButton1.input = true;
	if(attrNo == 2){
		text1 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[0][0], solButtonStyle);
	}
	else{
    	text1 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[0][0].charAt(0), solButtonStyle);
		}

	xPos = getSolButtonX(buttonArray[1][2], 0);
	yPos = getSolButtonY(buttonArray[1][2], 0);
	solutionButton2.loadTexture('smallAnswerButton', 0 ,1, 0, 1);
	solutionButton2.reset(xPos,yPos)
	solutionButton2.answer = false;
	solutionButton2.answerNo = 1;
	solutionButton2.charNo = charNo;
	solutionButton2.attrNo = attrNo;
	solutionButton2.input = true;
	if(attrNo == 2){
		text2 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[1][0], solButtonStyle);
	}
	else{
		text2 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[1][0].charAt(0), solButtonStyle);
	}

	xPos = getSolButtonX(buttonArray[2][2], 0);
	yPos = getSolButtonY(buttonArray[2][2], 0);
	solutionButton3.loadTexture('smallAnswerButton', 0 ,1, 0, 1);
	solutionButton3.reset(xPos,yPos)
	solutionButton3.answer = false;
	solutionButton3.answerNo = 1;
	solutionButton3.charNo = charNo;
	solutionButton3.attrNo = attrNo;
	solutionButton3.input = true;
	if(attrNo == 2){
		text3 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[2][0], solButtonStyle);
	}
	else{
		text3 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[2][0].charAt(0), solButtonStyle);
	}

	xPos = getSolButtonX(buttonArray[3][2], 0);
	yPos = getSolButtonY(buttonArray[3][2], 0);
	solutionButton4.loadTexture('smallAnswerButton', 0 ,1, 0, 1);
	solutionButton4.reset(xPos,yPos)
	solutionButton4.answer = false;
	solutionButton4.answerNo = 1;
	solutionButton4.charNo = charNo;
	solutionButton4.attrNo = attrNo;
	solutionButton4.input = true;
	if(attrNo == 2){
		text4 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[3][0], solButtonStyle);
	}
	else{
		text4 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[3][0].charAt(0), solButtonStyle);
	}

	xPos = getSolButtonX(buttonArray[4][2], 0);
	yPos = getSolButtonY(buttonArray[4][2], 0);
	solutionButton5.loadTexture('smallAnswerButton', 0 ,1, 0, 1);
	solutionButton5.reset(xPos,yPos)
	solutionButton5.answer = false;
	solutionButton5.answerNo = 1;
	solutionButton5.charNo = charNo;
	solutionButton5.attrNo = attrNo;
	solutionButton5.input = true;
	if(attrNo == 2){
		text5 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[4][0], solButtonStyle);
	}
	else{
		text5 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[4][0].charAt(0), solButtonStyle);
	}

	xPos = getSolButtonX(buttonArray[5][2], 0);
	yPos = getSolButtonY(buttonArray[5][2], 0);
	solutionButton6.loadTexture('smallAnswerButton', 0 ,1, 0, 1);
	solutionButton6.reset(xPos,yPos)
	solutionButton6.answer = false;
	solutionButton6.answerNo = 1;
	solutionButton6.charNo = charNo;
	solutionButton6.attrNo = attrNo;
	solutionButton6.input = true;
	if(attrNo == 2){
		text6 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[5][0], solButtonStyle);
	}
	else{
		text6 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[5][0].charAt(0), solButtonStyle);
	}

	timeLeft = timeForAnswer;
	timeLeftTimer.resume();
	timeLeftText.visible = true;
	timerPic.visible = true;
	timeLeftText.setText(timeLeft);
}

function createBigButtons(charNo, attrNo){
	gameButton.visible = false;
	gameButton.input = false;

	var solButtonStyle = { font: "20px Arial", fill: "#ff0044", align: "center" };
	var textXAdd = 25;
	var textYAdd = 12;

	xPos = getSolButtonX(buttonArray[0][2], 1);
	yPos = getSolButtonY(buttonArray[0][2], 1);
	solutionButton1.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton1.reset(xPos,yPos)
	solutionButton1.answer = true;
	solutionButton1.answerNo = 2;
	solutionButton1.input = true;
	text1 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[0][0], solButtonStyle);

	xPos = getSolButtonX(buttonArray[1][2], 1);
	yPos = getSolButtonY(buttonArray[1][2], 1);
	solutionButton2.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton2.reset(xPos,yPos)
	solutionButton2.answer = false;
	solutionButton2.answerNo = 2;
	solutionButton2.input = true;
	text2 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[1][0], solButtonStyle);

	xPos = getSolButtonX(buttonArray[2][2], 1);
	yPos = getSolButtonY(buttonArray[2][2], 1);
	solutionButton3.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton3.reset(xPos,yPos)
	solutionButton3.answer = false;
	solutionButton3.answerNo = 2;
	solutionButton3.input = true;
	text3 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[2][0], solButtonStyle);

	xPos = getSolButtonX(buttonArray[3][2], 1);
	yPos = getSolButtonY(buttonArray[3][2], 1);
	solutionButton4.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton4.reset(xPos,yPos)
	solutionButton4.answer = false;
	solutionButton4.answerNo = 2;
	solutionButton4.input = true;
	text4 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[3][0], solButtonStyle);

	xPos = getSolButtonX(buttonArray[4][2], 1);
	yPos = getSolButtonY(buttonArray[4][2], 1);
	solutionButton5.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton5.reset(xPos,yPos)
	solutionButton5.answer = false;
	solutionButton5.answerNo = 2;
	solutionButton5.input = true;
	text5 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[4][0], solButtonStyle);

	xPos = getSolButtonX(buttonArray[5][2], 1);
	yPos = getSolButtonY(buttonArray[5][2], 1);
	solutionButton6.loadTexture('bigAnswerButton', 0, 1, 0, 1);
	solutionButton6.reset(xPos,yPos)
	solutionButton6.answer = false;
	solutionButton6.answerNo = 2;
	solutionButton6.input = true;
	text6 = game.add.text(xPos + textXAdd, yPos + textYAdd, buttonArray[5][0], solButtonStyle);

	timeLeft = timeForAnswer;
	timeLeftTimer.resume();
	timeLeftText.visible = true;
	timerPic.visible = true;
	timeLeftText.setText(timeLeft);
}

function getSolButtonY(posNo, whichButton){
	if(whichButton == 0){ //small
		if(posNo == 1){return 200}
		if(posNo == 2){return 300}
		if(posNo == 3){return 400}
		if(posNo == 4){return 200}
		if(posNo == 5){return 300}
		if(posNo == 6){return 400}
	}
	if(whichButton == 1){ //big
		if(posNo == 1){return 200}
		if(posNo == 2){return 250}
		if(posNo == 3){return 300}
		if(posNo == 4){return 350}
		if(posNo == 5){return 400}
		if(posNo == 6){return 450}
	}
}

function getSolButtonX(posNo, whichButton){
	if(whichButton == 0){ //small
		if(posNo == 1){return game.world.centerX + 200}
		if(posNo == 2){return game.world.centerX + 200}
		if(posNo == 3){return game.world.centerX + 200}
		if(posNo == 4){return game.world.centerX + 100}
		if(posNo == 5){return game.world.centerX + 100}
		if(posNo == 6){return game.world.centerX + 100}
	}
	if(whichButton == 1){ //big
		if(posNo == 1){return game.world.centerX + 100}
		if(posNo == 2){return game.world.centerX + 100}
		if(posNo == 3){return game.world.centerX + 100}
		if(posNo == 4){return game.world.centerX + 100}
		if(posNo == 5){return game.world.centerX + 100}
		if(posNo == 6){return game.world.centerX + 100}
	}
}

function checkSolution(button){
	timeLeftTimer.pause();
	timeLeftText.visible = false;
	timerPic.visible = false;
	if(button.answer == true){
		if(button.answerNo == 1){
			destroySolutionButtons();

			gameButton.input = true;
			gameButton.visible = true;
			gamePoints = gamePoints + questionSolvedFirstStep;
			gamePoints = gamePoints + timeLeft * pointsPerSecondLeft;
			pointsText.setText(gamePoints);
			gameForward();

		}
		else{
			destroySolutionButtons();
			gameButton.input = true;
			gameButton.visible = true;
			gamePoints = gamePoints + questionSolvedSecondStep;
			gamePoints = gamePoints + timeLeft * pointsPerSecondLeft;
			pointsText.setText(gamePoints);
			gameForward();
		}

	}
	else{
		if(button.answerNo == 1){
			destroySolutionButtons();
			createBigButtons(button.charNo, button.attrNo);

		}
		else{
			destroySolutionButtons();
			gameButton.input = true;
			gameButton.visible = true;
			gameForward();
		}
	}
}

function destroySolutionButtons(){
	solutionButton1.input = false;
	solutionButton1.visible = false;
	solutionButton2.input = false;
	solutionButton2.visible = false;
	solutionButton3.input = false;
	solutionButton3.visible = false;
	solutionButton4.input = false;
	solutionButton4.visible = false;
	solutionButton5.input = false;
	solutionButton5.visible = false;
	solutionButton6.input = false;
	solutionButton6.visible = false;
	text1.destroy();
	text2.destroy();
	text3.destroy();
	text4.destroy();
	text5.destroy();
	text6.destroy();
}


function gameForward(){
	if(questCount < questionsAsked){ //phase 1
		if(questOrAttCount >= 3){
			gameButton.frame = 0;
		}

		timeLeftTimer.pause();
		timeLeftText.visible = false;
		timerPic.visible = false;

		if(attrCounter >= 40){
			questOrAttCount = 3;
		}

		if(questOrAttCount < 3){
    			var attributeString;

	    		if(tempCharCount == 2){
	    			tempCharNo = getNextCharInt();
	    			tempCharCount = 0;
	    		}

	    		attributeString = introduceNewAttributes(tempCharNo);
	    		tempCharCount++;

				if(tempCharNo == 2 || tempCharNo == 3)
				{
					text_2.setText(attributeString);
					text_1.visible = false;
					text_2.visible = true;
				}
				else
				{
					text_1.setText(attributeString);
					text_2.visible = false;
					text_1.visible = true;
				}
	    		questOrAttCount++;
		}
		else{
			introduceNewQuestion();
			questOrAttCount++;
			if(questOrAttCount == 5){
				questOrAttCount = 1;
			}
		}
	}
	else{ //phase2
		if(ph2questionCount == 0){
			endPh1();
			ph2QuestionText.visible;
		}

		introducePh2Question();
	}
}

function introducePh2Question(){
	gameButton.input = false;
	gameButton.visible = false;

	saschaHead.visible = true;
	saschaHead.input = true;
	emmanuelHead.visible = true;
	emmanuelHead.input = true;
	jennyHead.visible = true;
	jennyHead.input = true;
	marleneHead.visible = true;
	marleneHead.input = true;
	mariusHead.visible = true;
	mariusHead.input = true;
	table.visible = true;

	ph2SolutionText.visible = false;
	ph2SolutionText2.visible = false;

	ph2QuestionText.visible = true;
	ph2QuestionText.setText(ph2questions[ph2questionCount]);
	ph2questionCount++;

}

function hidePh2Question(){
	ph2QuestionText.visible = false;

	saschaHead.input = false;
	saschaHead.visible = false;
	emmanuelHead.visible = false;
	emmanuelHead.input = false;
	jennyHead.visible = false;
	jennyHead.input = false;
	marleneHead.visible = false;
	marleneHead.input = false;
	mariusHead.visible = false;
	mariusHead.input = false;
}

function ph2CheckSolution(button) {
	hidePh2Question();
	ph2SolutionText.visible = true;
	ph2SolutionText2.visible = true;
	switch(ph2questionCount){
		case 1:
			if(button.name == 'emmanuel'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Als Informatiker der Robotorkämpfe betreibt fällt vermutlich besonders viel Elektromüll an.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders viel Elektromüll fällt bei Informatikern oder Robotorkämpfen an.',70));
			}
		ph2SolutionText2.setText('Dieser kann verringert werden indem man:\n-Elektronik kauft die möglichst Recyclebar ist\n-Versucht Dinge zu repairieren anstatt sie neu zu kaufen');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 2:
			if(button.name == 'marius' || button.name == 'emmanuel'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Bei Fertigprodukten und Lieferservicen fällt besonders viel Verpackungsmüll an',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders viel Verpackungsmüll fällt bei Fertigprodukten und Lieferservicen an.',70));
			}
		ph2SolutionText2.setText('Dieser kann verringert werden indem man:\n' + '-Unverpackte Lebensmittel wie friches Obst,Gemüse\nund Fleich kauft\n-Wenn möglich Familienpackungen kauft');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 3:
			if(button.name == 'marlene' || button.name == 'jenny'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Beim Verkleidungen herstellen(Cosplay) und Basteln fällt besonders viel Verpackungsmüll an.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders viel Stoff/Papier fällt bei Cosplay(Verkleidungen) und beim Basteln an.',70));
			}
		ph2SolutionText2.setText('Dieser kann verringert werden indem man:\n' + '-Stoff- und Papierreste versucht an anderer Stelle\nnoch zu verwenden');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 4:
			if(button.name == 'marius'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Da Marius ein Glasflaschentrinker ist fällt besonders viel Glasmüll an.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders viel Glasflaschen fallen bei Marius dem Glasflaschentrinker an.',70));
			}
		ph2SolutionText2.setText('Der Glasmüll kann verringert werden indem man:\n' + '-Nur Glasflaschen kauft, auf denen das Mehrweg Zeichen ist\n');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 5:
			if(button.name == 'emmanuel'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Beim Nachtwandern werden besonders viele Batterien und Glühbirnen verbraucht.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders viel Batterien und Glühbirnen fallen beim Nachtwandern an.',70));
			}
		ph2SolutionText2.setText('Glühbirnen und Batterien können verringert werden indem man:\n' + '-Energiesparglühbirnen kauft, am besten vollständig recyclebare\n-Wiederaufladbare Akkus statt Batterien verwendet');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 6:
			if(button.name == 'jenny'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Besonders wenig Restmüll produziert Jenny, da sie einen Kompost besitzt.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders wenig Restmüll produziert Jenny, da sie einen Kompost besitzt.',70));
			}
		ph2SolutionText2.setText('Wenn man einen Kompost besitzt kann man dort alle natürlich\nabbaubaren Reste loswerden, zB. Essensreste oder Taschentücher.');
		gameButton.visible = true;
		gameButton.input = true;
		break;
		case 7:
			if(button.name == 'sascha'){
				gamePoints = gamePoints + pointsPh2Question;
				ph2SolutionText.setText('Richtig!\n' + addNewLineAtSpace('Besonders wenig Flaschen fallen bei Sascha an, da er nur Leitungswasser trinkt.',70));
			}
			else{
				ph2SolutionText.setText('Leider falsch!\n' + addNewLineAtSpace('Besonders wenig Flaschen fallen bei Sascha an, da er nur Leitungswasser trinkt.',70));
			}
		ph2SolutionText2.setText('Durch das trinken von Leitungswasser kann man komplett\nauf Flaschen schleppen verzichten und erzeugt weniger Müll!');
		gameButton.visible = true;
		gameButton.input = true;
		break;
	}

}

function endPh1(){
			emmanuel.visible = false;
			marlene.visible = false;
			sascha.visible = false;
			jenny.visible = false;
			marius.visible = false;

			text_1.visible = false;
			text_2.visible = false;

			bubble1_1.visible = false;
			bubble1_2.visible = false;
}

function getAttributeString(charNo, attrNo){
	var randNo = getRandomInt(0,2);
	var attributeString;
	var signsPerRow = 30;
	var attributeString = '';
	switch (attrNo) {
		case 1:
			switch (randNo){
				case 0:
					attributeString =  "Hey!\n" + addNewLineAtSpace("Ich heiße " + table[charNo][attrNo][0] + ".",signsPerRow);
					break;
				case 1:
					attributeString =  "Moin!\n" + addNewLineAtSpace("Ich bin " + table[charNo][attrNo][0] + ".",signsPerRow);
					break;
				case 2:
					attributeString = "Hallo!\n" + addNewLineAtSpace("Du kannst mich " + table[charNo][attrNo][0] + " nennen.",signsPerRow);
					break;
			}
			break;
		case 2:
			switch (randNo){
				case 0:
					attributeString = addNewLineAtSpace("Ich bin " + table[charNo][attrNo][0] + " Jahre alt.",signsPerRow);
					break;
				case 1:
					attributeString = addNewLineAtSpace("Ich werde nächsten Monat " + (table[charNo][attrNo][0]+1) + ".",signsPerRow);
					break;
				case 2:
					attributeString = addNewLineAtSpace("Ich bin " + table[charNo][attrNo][0] + " Jahre jung.",signsPerRow);
					break;
			}
			break;
		case 3:
			if(table[charNo][attrNo][0] == 'Getränkemarkt'){
				if(charNo == 1 || charNo == 3){
					attributeString = addNewLineAtSpace("Mein Geld verdiene ich als Angestellte in einem " + table[charNo][attrNo][0] + ".",signsPerRow);
				}
				else{
					attributeString = addNewLineAtSpace("Mein Geld verdiene ich als Angestellter in einem " + table[charNo][attrNo][0] + ".",signsPerRow);
				}
			}
			else if(table[charNo][attrNo][0] == 'Mutter' || table[charNo][attrNo][0] == 'Vater'){
				attributeString = addNewLineAtSpace("Ich bin " + table[charNo][attrNo][0] + " von 2 Töchtern auf die ich Tagsüber aufpasse.",signsPerRow);
			}
			else{
				switch (randNo){
					case 0:
						attributeString = addNewLineAtSpace("Mein Geld verdiene ich als " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
					case 1:
						attributeString = addNewLineAtSpace("Ich arbeite als " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
					case 2:
						attributeString = addNewLineAtSpace("Ich bin " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
				}
			}
			break;
		case 4:
			if(table[charNo][attrNo][0] == 'Nichts'){
				attributeString = addNewLineAtSpace("Um mich fit zu halten mache ich eigentlich nichts.",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Robotorkämpfe'){
				attributeString = addNewLineAtSpace("Mein Sport sind Robotorkämpfe die ich alle 2 Wochen austrage.",signsPerRow);
			}
			else{
				switch (randNo){
					case 0:
						attributeString = addNewLineAtSpace("Um mich fit zu halten gehe ich regelmäßig zum " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
					case 1:
						attributeString = addNewLineAtSpace("Ich halte mich fit indem ich zum " + table[charNo][attrNo][0] + " gehe.",signsPerRow);
						break;
					case 2:
						attributeString = addNewLineAtSpace("Ich bin sportlich und gehe sehr oft zum " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
				}
			}
			break;
		case 5:
			if(table[charNo][attrNo][0] == 'Kantine'){
				if(randNo == 0){
					attributeString = addNewLineAtSpace("Mittags esse ich meistens etwas in der Kantine.",signsPerRow);
				}
				else{
					attributeString = addNewLineAtSpace("Für gewöhnlich esse ich Mittags in der Kantine.",signsPerRow);
				}
			}
			else if(table[charNo][attrNo][0] == 'Restaurant'){
				attributeString = addNewLineAtSpace("Mittags esse ich etwas in einem Restaurant.",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Selbstgekochtes'){
				attributeString = addNewLineAtSpace("Bei uns gibt es zu Mittag immer Selbstgekochtes.",signsPerRow);
			}
			else{
				attributeString = addNewLineAtSpace("Mittags bestelle ich mir etwas bei einem Lieferservice.",signsPerRow);
			}
			break;
		case 6:
			if(table[charNo][attrNo][0] == 'Nachtwandern'){
					attributeString = addNewLineAtSpace("Wenn ich die Zeit finde gehe ich oft mit meinen Freunden Nachtwandern",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Cosplay'){
				attributeString = addNewLineAtSpace("Meine Leidenschaft ist Cosplay, dabei entwirft man Kostüme und verkleidet sich zu Figuren aus Spielen und Serien.",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Theater'){
				attributeString = addNewLineAtSpace("Ich sehe mir sehr gerne Theaterstücke an.",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Basteln'){
				attributeString = addNewLineAtSpace("Ich und meine Töchter basteln sehr gerne.",signsPerRow);
			}
			else{
				attributeString = addNewLineAtSpace("Ich sehe mir ziemlich jedes Fussballspiel an.",signsPerRow);
			}
			break;
		case 7:
			switch (randNo){
				case 0:
					attributeString = addNewLineAtSpace("Bei mir gibt es Abends " + table[charNo][attrNo][0] + ".",signsPerRow);
					break;
				case 1:
					attributeString = addNewLineAtSpace("An einem normalen Abend esse ich " + table[charNo][attrNo][0] + ".",signsPerRow);
					break;
				case 2:
					attributeString = addNewLineAtSpace("Meistens esse ich zu Abend " + table[charNo][attrNo][0] + ".",signsPerRow);
					break;
			}
			break;
		case 8:
			if(table[charNo][attrNo][0] == 'Kompost'){
					attributeString = addNewLineAtSpace("Wir haben bei uns einen Kompost in dem ich den meisten Abfall loswerde",signsPerRow);
			}
			else if(table[charNo][attrNo][0] == 'Prinzessin'){
				attributeString = addNewLineAtSpace("Meine Kollegen nennen mich manchmal Prinzessin, weil ich soviele verschiedene Kleider anziehe.",signsPerRow);
			}
			else{
				switch (randNo){
					case 0:
						attributeString = addNewLineAtSpace("Ich bin ein totaler " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
					case 1:
						attributeString = addNewLineAtSpace("Freunde nennen mich: Den " + table[charNo][attrNo][0] + ".",signsPerRow);
						break;
					case 2:
						attributeString = addNewLineAtSpace("Oft werde ich " + table[charNo][attrNo][0] + " genannt.",signsPerRow);
						break;
				}
			}
	}
	return attributeString;
}

function decTimeLeft(){
	timeLeft--;
	timeLeftText.setText(timeLeft);

	if(timeLeft == 0){
		destroySolutionButtons();
		gameButton.input = true;
		gameButton.visible = true;
		gameForward();
	}
}
