class Chromosome {
    constructor(genes, fitness) {
      this.genes = genes;
      this.fitness = fitness;
    }
}

var population = [];  

// color 1 = #769656
// color 2 = #EEEED2
// color 3 = #BBCA44

var population_size = 0;
var elitism_size = 0;
var max_generation = 0;
var crossover_prob = 0;
var mutation_prob = 0;
var generation_count = 0;



function Start(){
    population_size = document.getElementById('popSize').value;
    max_generation = document.getElementById('genCount').value;
    crossover_prob = document.getElementById('crossProb').value;
    mutation_prob = document.getElementById('mutateProb').value;

    if(crossover_prob < 0 || crossover_prob > 1){
        alert('Crossover Probability tidak berada dalam range yang ditentukan');
        return;
    }

    if(mutation_prob < 0 || mutation_prob > 1){
        alert('Mutation Probability tidak berada dalam range yang ditentukan');
        return;
    }

    if(max_generation <= 0 || population_size < 10){
        alert('Max Generation harus lebih besar dari 0 dan Population Size harus minimal 10');
        return;
    }

    generation_count = 0;
    document.getElementsByClassName('board')[0].innerHTML = "";

    initBoard();
    initPopulation();
    GeneticAlgorithm();

    population[0].genes.forEach((val, idx) => {
        let node = document.getElementById(val + "," + idx);
        let img = document.createElement('img');
        img.setAttribute("width", "75px");
        img.setAttribute('src', "queen.png");
        node.appendChild(img);
    });

    document.getElementById('res').innerHTML = "Result : ";
    if(population[0].fitness == 8){
        let text = document.createElement('span');
        text.classList.add('text-success');
        text.innerHTML = " Solution found within " + generation_count + " generations";
        document.getElementById('res').appendChild(text);
    }else{
        let text = document.createElement('span');
        text.classList.add('text-danger');
        text.innerHTML = " Solution not found, generation count : " + generation_count + " generations";
        document.getElementById('res').appendChild(text);
    }

    displayAllGenes(population);
    printGene(population[0]);
}

function initBoard(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            let node = document.createElement('div');
            node.classList.add('tile');
            node.setAttribute('id', i + "," + j);

            if(i % 2 == 0 && j % 2 == 1){
                node.classList.add('color1');
            }else if(i % 2 == 0 && j % 2 == 0){
                node.classList.add('color3');
            }else if(i % 2 == 1 && j % 2 == 1){
                node.classList.add('color3');
            }else if(i % 2 == 1 && j % 2 == 0){
                node.classList.add('color1');
            }

            document.getElementsByClassName('board')[0].appendChild(node);
        }
    }
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
    // Roulette Selection / Rank Selection
    let sum_fitness = 0;
    let cummulative_fitness = [];
    for (let i = 0 ; i < population_size ; i++){
        sum_fitness += population[i].fitness;
        cummulative_fitness[i] = sum_fitness;
    }
    
    let idx_parent_1 = -1;
    let idx_parent_2 = -1;

    while (idx_parent_1 == idx_parent_2){
        random = Math.floor(Math.random() * sum_fitness);

        for (let i = 0 ; i < population_size ; i++){
            if (cummulative_fitness[i] > random) {
                idx_parent_1 = i;
                break;
            }
        }

        random = Math.floor(Math.random() * sum_fitness);
        for (let i = 0 ; i < population_size ; i++){
            if (cummulative_fitness[i] > random) {
                idx_parent_2 = i
                break;
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
}

function displayOne(idx){
    document.getElementsByClassName('board')[0].innerHTML = "";
    initBoard();

    let popSelected = population[idx];

    popSelected.genes.forEach((val, idx) => {
        let node = document.getElementById(val + "," + idx);
        let img = document.createElement('img');
        img.setAttribute("width", "75px");
        img.setAttribute('src', "queen.png");
        node.appendChild(img);
    });
}

function displayAllGenes(population){
    document.getElementById('result').innerHTML = "";
    population.forEach((val, idx) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        td1.innerHTML = idx + 1 + "";
        td2.innerHTML = val.genes;
        td3.innerHTML = val.fitness;

        let button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-info');
        button.classList.add('text-white');
        button.innerHTML = "Display";
        button.setAttribute('onClick', `displayOne(${idx})`);
        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        document.getElementById('result').append(tr);
    })
}