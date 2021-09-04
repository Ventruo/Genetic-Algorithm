# Genetic-Algorithm

An assignment for my Soft Computing Class in ISTTS together with my senior Rommy Christensen. <br>

In this project, we tried to build a genetic algorithm for the 8-Queens Problem.<br> 
The code we mainly use HTML, CSS and Javascript. <br>

## Before we start
We need to learn some names and aliases that we will use. <br>
- Gene : a genetic trait that each individual has. Usually an individual has more than 1 gene, we call it Genes.
- Chromosome : an individual that is identified by it's genes.
- Population : a cluster/group of chromosomes in one environment.
- Offspring : a child of two parent.
- Mutation : process of changing a gene of an individual.
- Fitness : a score defining how superior each individual is based on a certain rule.
- Selection : process of eliminating chromosomes to the limit of population.

## How does it work?
![image](https://user-images.githubusercontent.com/63797376/132101694-f9f0b415-5c15-4093-a9b3-e1aa8f4c2b5f.png)
- First we determine the population size limit and number of Generations.
- Other than that, we also need to determine the probability of Crossover and Mutation
- The Crossover is needed to define how each pair of chromosome/individual would create 2 new offspring or not.
- The Mutataion is needed to define if the offsprings' gene of a pair would mutate or not.
- Finally we just need to press the Start button

## What happen after that?
![image](https://user-images.githubusercontent.com/63797376/132101799-7e014ff0-686d-4e8a-a1e5-fce33039da6c.png) <br>
- The program then will run a Genetic Algorithm with a certain constraint that meet the 8-Queens Problem.
- The algorithm then will loop until either a solution is found or within the Generation Limit Number.
- For each loop, it will pair two chromosomes randomly with different genes to make two new offsprings. Of course the creation of these offsprings are determined by the Crossover Probability.
- If then in the process it creates two new offsprings, these offsprings would have half the genes of each parent.
- The genes that they get then can mutate into a different gene depends on the Mutation Rate. Only 1 gene will be mutated and it will be randomized.
- These new born chromosomes then will get a fitness number based on the 8-Queens Problem (each queen cannot eat another).

## But can the chromosomes die?
- Yes! of course. But they didn't die because of age or something. Well some genetic algorithm uses age. But not in this one!
- It is called Selection. The process of eliminating some chromosomes to reduce population size.
- There are many ways to select which chromosome to eliminate. We will use Roulette Wheel Selection.
![image](https://user-images.githubusercontent.com/63797376/132102606-9dd84383-5460-41a6-acb0-a70a63415e7b.png)
- We rank individuals based on their fitness and we pick a random number between the fitness number.
- A number representing the fitness then will be eliminated. 
- The Roulette Wheel Selection feels like the most "fair" way to select a chromosome randomly.
- Why? Because the smaller fitness would have a bigger chance to be eliminated and the bigger fitness would not.
- We do the selection process until the pupulation reached the max population size.
- After that then we continue the algorithm until we get a solution or the generation limit number.

## Successful Test
![image](https://user-images.githubusercontent.com/63797376/132102706-7a5bd73c-e3dc-48b1-8476-ed7f5d5ade44.png)

## Failed Test
![image](https://user-images.githubusercontent.com/63797376/132102715-8b729960-03b7-461e-b949-d808d5f21572.png)
