const values = [{id: '1', votes: 100},
    {id:'2', votes: 200},
    {id:'3', votes: 350}];

const maisVotado = values.map(el => el.votes).reduce(function(prev, current) { 
	return prev > current ? prev : current; 
})

const vencedor = values.find( v => v.votes === maisVotado)



console.log(vencedor);