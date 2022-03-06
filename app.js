function getRandomValue(min, max)
{
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return{
            healthPlayer : 100,
            healthMonster : 100,
            currentRound : 0,
            specialCount : 0,
            battleLog : [],
            winner : null
        };
    },
    computed:
    {
        monsterBarStyles(){
            return {width : this.healthMonster + '%'};
        },
        playerBarStyles(){
            return {width: this.healthPlayer + '%'};
        },
        mayUseSpecialAttack(){
            return (this.specialCount>0);
            this.currentRound;
        },
    },
    watch:
    {
        healthPlayer(value) {
            if(value<=0 && this.healthMonster<=0)
            {
                this.healthPlayer = 0; this.healthMonster = 0;
                this.winner = 'draw';
            }
            else if(value<=0){
                this.healthPlayer = 0;
                this.winner = 'monster';
            }
        },
        healthMonster(value) {
            if(value<=0 && this.healthPlayer<=0){
                this.healthPlayer = 0; this.healthMonster = 0;
                this.winner = "draw";
            }
            else if(value<=0)
            {
                this.healthMonster = 0;
                this.winner = "player";
            }
        },
    },
    methods:
    {
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.healthMonster = this.healthMonster - attackValue;
            this.addLogMessage('Player','attack',attackValue);
            this.attackPlayer();
            this.currentRound++;
            this.specialCount--;
        }, 
        attackPlayer(){
            const attackValue = getRandomValue(7,15);
            this.healthPlayer = this.healthPlayer - attackValue;
            this.addLogMessage('Monster','attack',attackValue);
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10,25);
            this.healthMonster = this.healthMonster - attackValue;
            this.addLogMessage('Player','SPECIAL',attackValue);
            this.attackPlayer();
            this.currentRound++;
            this.specialCount = 3;
        },
        healPlayer(){
            const healValue = getRandomValue(8,20);
            if((this.healthPlayer + healValue) > 100)
            {
                this.healthPlayer = 100;
                this.addLogMessage('player','heal',0);
            }
            else{
            this.healthPlayer = this.healthPlayer + healValue;
            this.addLogMessage('Player','heal',healValue);
            this.currentRound++;
            this.specialCount--; 
            }
            this.attackPlayer();
        },
        surrender(){
            this.winner = "monster";
            this.addLogMessage('Player','Surrender', 'Player lost');
        },
        reset(){
            this.healthPlayer = 100;
            this.healthMonster = 100;
            this.currentRound = 0;
            this.specialCount = 0;
            this.battleLog = [];
            this.winner = null;
        },
        addLogMessage(who,what,value){
            this.battleLog.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value
            });
        },
    },
})

app.mount("#game");