class Chromosome {
    constructor(genes, fitness) {
      this.genes = genes;
      this.fitness = fitness;
    }
}

var population = [];  


var population_size = 0;
var elitism_size = 0;
var generation_count = 0;
var crossover_prob = 0;
var mutation_prob = 0;
function Start(){
    population_size = document.getElementById('popSize').value;
    elitism_size = Math.round(population_size * 0.1);
    if (elitism_size < 2) elitism_size = 2;
    generation_count = document.getElementById('genCount').value;
    crossover_prob = document.getElementById('crossProb').value;
    mutation_prob = document.getElementById('mutateProb').value;

    initPopulation();
    GeneticAlgorithm();
}

function initPopulation(){
    //1 chromosome = lots of genes
    //1 gene = 1 data
    for (let i = 0 ; i < population_size; i ++){

        genes = [];
        for (let j = 0 ; j < 8 ; j ++){
            row = Math.floor(Math.random() * 8); //randoms 0 to 7
            genes[j] = row;
        }
        fitness = fitnessFunction(genes);
        console.log(fitness);

        population[i] = new Chromosome(genes, fitness);
    }
    sortFitness();
}

function GeneticAlgorithm(){
    
    selection();

}

function fitnessFunction(genes){
    let alive = [1, 1, 1, 1, 1, 1, 1, 1];

    console.log(genes);
    for (let column = 0 ; column < genes.length ; column ++){
        console.log("column : " + column);
        for (let n = 1 ; n < genes.length - column ; n ++){
            // check right
            if (column + n <= 7)
            {
                // check straight
                if (genes[column] == genes[column + n]){
                    alive[column] = 0;
                    alive[column + n] = 0;
                    console.log('straight right, dead at ' + column + " - " + (column + n));
                }

                // check diagonal up
                if (genes[column] == genes[column + n] - n){
                    alive[column] = 0;
                    alive[column + n] = 0;
                    console.log('diagonal right up, dead at ' + column + " - " + (column + n));
                }

                // check diagonal down
                if (genes[column] == genes[column + n] + n){
                    alive[column] = 0;
                    alive[column + n] = 0;
                    console.log('diagonal right down, dead at ' + column + " - " + (column + n));
                }
            }

            // check left
            if (column - n >= 0){
                //check straight
                if (genes[column] == genes[column - n]){
                    alive[column] = 0;
                    alive[column - n] = 0;
                    console.log('straight left, dead at ' + column + " - " + (column - n));
                }

                // check diagonal up
                if (genes[column] == genes[column - n] - n){
                    alive[column] = 0;
                    alive[column - n] = 0;
                    console.log('diagonal left up, dead at ' + column + " - " + (column - n));
                }

                // check diagonal down
                if (genes[column] == genes[column - n] + n){
                    alive[column] = 0;
                    alive[column - n] = 0;
                    console.log('diagonal left down, dead at ' + column + " - " + (column - n));
                }
            }
        }
    }
    
    let functionScore = 0;
    for (let i = 0; i < alive.length ; i++) {
        functionScore += alive[i];
    }

    return functionScore;
}

function sortFitness(){
    population.sort(compareFitness);
}

function compareFitness(a, b) {
    if (a.fitness < b.fitness){
      return 1;
    }
    if (a.fitness > b.fitness){
      return -1;
    }
    return 0;
}

function selection(){
    
}

function randomParents(){
    
}

function crossover(gene1, gene2){

}

function mutate(genes){
    
}

