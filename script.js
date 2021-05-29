class Chromosome {
    constructor(genes, fitness) {
      this.genes = genes;
      this.fitness = fitness;
    }
}

var population = [];  


var population_size = 0;
var elitism_size = 0;
var max_generation = 0;
var crossover_prob = 0;
var mutation_prob = 0;
var generation_count = 0;
function Start(){
    population_size = document.getElementById('popSize').value;
    elitism_size = Math.ceil(population_size * 0.1);
    if (elitism_size < 2) elitism_size = 2;
    max_generation = document.getElementById('genCount').value;
    crossover_prob = document.getElementById('crossProb').value;
    mutation_prob = document.getElementById('mutateProb').value;
    generation_count = 0;

    initPopulation();
    GeneticAlgorithm();

    console.log(population);
    console.log('Generation Count : ' + generation_count);
    printGene(population[0]);
}

function initPopulation(){
    //1 chromosome = lots of genes
    //1 gene = 1 data
    population = [];

    for (let i = 0 ; i < population_size; i ++){

        genes = [];
        for (let j = 0 ; j < 8 ; j ++){
            row = Math.floor(Math.random() * 8); //randoms 0 to 7
            genes[j] = row;
        }
        fitness = fitnessFunction(genes);

        population[i] = new Chromosome(genes, fitness);
    }
    sortFitness();
}

function GeneticAlgorithm(){
    generation_count = 0;
    while(population[0].fitness < 8 && generation_count < max_generation){
        let newPopulation = [];
        for (let i = 0 ; i <  Math.ceil(population_size/2) ; i++){
            let selections = selection();
    
            if (Math.random() <= crossover_prob){
                let offsprings = crossover(population[selections.idx_parent_1].genes, population[selections.idx_parent_2].genes);
                let mutated_offsprings = mutate(offsprings);
                
                for (let mutated_offspring of mutated_offsprings){
                    let fitness = fitnessFunction(mutated_offspring);
    
                    newPopulation.push(new Chromosome(mutated_offspring, fitness));
                }
            }
        }
        population = population.concat(newPopulation);
        sortFitness();
        population = population.splice(0, population_size);
        
        generation_count++;
    }
}

function fitnessFunction(genes){
    let alive = [1, 1, 1, 1, 1, 1, 1, 1];

    for (let column = 0 ; column < genes.length ; column ++){
        for (let n = 1 ; n < genes.length - column ; n ++){
            // check right
            if (column + n <= 7)
            {
                // check straight
                if (genes[column] == genes[column + n]){
                    alive[column] = 0;
                    alive[column + n] = 0;
                }

                // check diagonal up
                if (genes[column] == genes[column + n] - n){
                    alive[column] = 0;
                    alive[column + n] = 0;
                }

                // check diagonal down
                if (genes[column] == genes[column + n] + n){
                    alive[column] = 0;
                    alive[column + n] = 0;
                }
            }

            // check left
            if (column - n >= 0){
                //check straight
                if (genes[column] == genes[column - n]){
                    alive[column] = 0;
                    alive[column - n] = 0;
                }

                // check diagonal up
                if (genes[column] == genes[column - n] - n){
                    alive[column] = 0;
                    alive[column - n] = 0;
                }

                // check diagonal down
                if (genes[column] == genes[column - n] + n){
                    alive[column] = 0;
                    alive[column - n] = 0;
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
    // 2 array
    let idx_parent_1 = -1;
    let idx_parent_2 = -1;
    while (idx_parent_1 == idx_parent_2){
        let bestFitness = -1;
        for(let i = 0; i < 5; i++){
            let idx = Math.floor(Math.random() * population_size);
            if (population[idx].fitness > bestFitness){
                idx_parent_1 = idx;
                bestFitness = population[idx].fitness;
            }
        }

        bestFitness = -1;
        for(let i = 0; i < 5; i++){
            let idx = Math.floor(Math.random() * population_size);
            if (population[idx].fitness > bestFitness){
                idx_parent_2 = idx;
                bestFitness = population[idx].fitness;
            }
        }
    }
    
    return {
        idx_parent_1, idx_parent_2
    }
}

function crossover(gene1, gene2){
    let a = gene1.filter((val, idx) => {
        return idx < 4;
    })
    let b = gene1.filter((val, idx) => {
        return idx > 3;
    })
    let c = gene2.filter((val, idx) => {
        return idx < 4;
    })
    let d = gene2.filter((val, idx) => {
        return idx > 3;
    })

    return [ a.concat(b), c.concat(d) ]
}

function mutate(offsprings){
    for (let offspring of offsprings){
        if (Math.random() <= mutation_prob){
            let idx_mutate = Math.floor(Math.random() * 8);

            let mutate_gene = Math.floor(Math.random() * 8);
            while(offspring[idx_mutate] == mutate_gene){
                mutate_gene = Math.floor(Math.random() * 8);
            }
            offspring[idx_mutate] = mutate_gene;
        }
    }
    
    return offsprings;
}

function printGene(chromosome){
    let res = "";
    for (let gene of chromosome.genes){
        res += "|" + gene + "|";
    }
    console.log(res, "fitness : " + chromosome.fitness);
}