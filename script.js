const bskt = document.getElementById('bskt');
const bskt_t = document.getElementById('teams_b');
const bskt_i = document.getElementById('infos_b');
const bskt_n = document.getElementById('players_news');
const bskt_d = document.getElementById('players_desc');
const current_players = document.getElementById('current_players');


const foot = document.getElementById('foot');
const foot_t = document.getElementById('teams');
const foot_i = document.getElementById('infos');
const matches_div = document.getElementById('matches');


const go_back_t = document.getElementById('go_back_t');
const go_back_b = document.getElementById('go_back_b');
const go_back_b_2 = document.getElementById('go_back_b_2');
const titles = document.getElementById('titles');


// Foot

var array_matchs = [];
var array_scheduled = [];

go_back_t.style.display = "none";
go_back_b.style.display = "none";
go_back_b_2.style.display = "none";
titles.style.display = "flex";
matches_div.style.display = "none";


fetch("http://api.football-data.org/v2/competitions/2015/teams?season=2021", {
	headers: {
		"X-Auth-Token": "444a1040a7064b31a3cff38528ce9cb7"
	}
})
	.then(response => response.json())
	.then(data => {
		data.teams.forEach(element => {
			var div = document.createElement('div');
			var logo = document.createElement('img');
			var name = document.createElement('p');

			div.classList.add('div');
			foot_t.appendChild(div);

			div.appendChild(logo);
			logo.src = element.crestUrl;

			div.appendChild(name);
			name.classList.add('name');
			name.textContent = element.name;

			div.addEventListener('click', () => {
				scrollTop();

				matches_div.style.display = "flex";
				foot_t.style.display = "none";
				foot_i.style.display = "flex";
				go_back_t.style.display = "flex";
				titles.style.display = "none";

				var logo_f = document.createElement('div');
				var team_infos = document.createElement('div');
				var address = document.createElement('p');
				var phone = document.createElement('p');
				var website = document.createElement('p');
				var email = document.createElement('p');
				var founded = document.createElement('p');
				var name2 = document.createElement('p');
				var logo2 = document.createElement('img');

				foot_i.append(logo_f, team_infos);

				logo_f.classList.add('logo');
				team_infos.classList.add('others_infos');

				logo_f.append(logo2, name2, founded);
				team_infos.append(address, phone, website, email);

				address.textContent = "Address : " + element.address;
				phone.textContent = "Phone : " + element.phone;
				website.textContent = "Website : " + element.website;
				email.textContent = "Email : " + element.email;
				founded.textContent = "Founded in " + element.founded;
				name2.textContent = element.name;
				logo2.src = element.crestUrl;

				fetch("http://api.football-data.org/v2/teams/" + element.id + "/matches?status=SCHEDULED&competitions=2015", {
					headers: {
						"X-Auth-Token": "444a1040a7064b31a3cff38528ce9cb7"
					}
				})
					.then(response => response.json())
					.then(data => {
						data.matches.forEach(match => {
							array_scheduled.push(match);
						})
						array_scheduled.sort((a, b) => b.id - a.id);

						var next_match_parent = document.createElement('div');
						var next_match = document.createElement('p');
						document.getElementById('scheduled_match').appendChild(next_match_parent);
						next_match_parent.appendChild(next_match);
						next_match.textContent = "Next match : J-" + array_scheduled[0].matchday + ", " + array_scheduled[0].homeTeam.name + " vs " + array_scheduled[0].awayTeam.name + ", " + array_scheduled[0].utcDate.slice(0, 10) + " at " + array_scheduled[0].utcDate.slice(11, 16);

					})

				fetch("http://api.football-data.org/v2/teams/" + element.id + "/matches?status=FINISHED&competitions=2015", {
					headers: {
						"X-Auth-Token": "444a1040a7064b31a3cff38528ce9cb7"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						data.matches.forEach(match => {
							array_matchs.push(match);
						})
						array_matchs.sort((a, b) => a.id - b.id);

						array_matchs.forEach(match => {
							var all_matchs = document.createElement('div');
							var each_match = document.createElement('div');
							var away = document.createElement('p');
							var home = document.createElement('p');
							var score = document.createElement('p');
							var matchday = document.createElement('p');
							var date = document.createElement('p');

							matchday.classList.add('matchday');
							date.classList.add('date_f');

							document.getElementById('match_results').appendChild(all_matchs);
							all_matchs.classList.add('all_matchs');

							all_matchs.appendChild(each_match);
							each_match.append(home, score, away, matchday, date);
							home.textContent = match.homeTeam.name;
							away.textContent = match.awayTeam.name;
							score.textContent = match.score.fullTime.homeTeam + " - " + match.score.fullTime.awayTeam;
							matchday.textContent = "J-" + match.matchday;
							date.textContent = match.utcDate.slice(0, 10);


						})
					})

				go_back_t.addEventListener('click', () => {
					foot_t.style.display = "flex";
					foot_i.style.display = "none";
					go_back_t.style.display = "none";
					foot_i.innerHTML = "";
					document.getElementById('match_results').innerHTML = "";
					array_matchs.length = 0;
					array_scheduled.length = 0;
					document.getElementById('scheduled_match').innerHTML = "";
					go_back_t.style.display = "none";
					titles.style.display = "flex";
					matches_div.style.display = "none";

				})
			})
		})
	})

// Basket

current_players.style.display = "none";

var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};

fetch("https://api.sportsdata.io/v3/nba/scores/json/teams?key=9756c7d8f085466e8131568cd1f6ec59", requestOptions)
	.then(response => response.json())
	.then(data => {
		data.forEach(team => {
			var div = document.createElement('div');
			var logo = document.createElement('img');
			var name = document.createElement('p');

			div.classList.add('div');
			bskt_t.appendChild(div);

			div.appendChild(logo);
			logo.src = team.WikipediaLogoUrl;

			div.appendChild(name);
			name.classList.add('name');
			name.textContent = team.Name;

			div.addEventListener('click', () => {
				scrollTop();
				current_players.style.display = "flex";
				bskt_t.style.display = "none";
				bskt_i.style.display = "flex";
				go_back_b.style.display = "flex";
				titles.style.display = "none";

				var logo_b = document.createElement('div');
				var team_infos = document.createElement('div');
				var city = document.createElement('p');
				var conference = document.createElement('p');
				var division = document.createElement('p');
				var name2 = document.createElement('p');
				var logo2 = document.createElement('img');

				bskt_i.append(logo_b, team_infos);

				logo_b.classList.add('logo');
				team_infos.classList.add('others_infos');

				logo_b.append(logo2, name2);
				team_infos.append(city, conference, division);

				city.textContent = "City : " + team.City;
				conference.textContent = "Conference : " + team.Conference;
				division.textContent = "Division : " + team.Division;
				name2.textContent = team.City + " " + team.Name;
				logo2.src = team.WikipediaLogoUrl;

				// Players
				fetch('https://api.sportsdata.io/v3/nba/scores/json/Players/' + team.Key + '?key=9756c7d8f085466e8131568cd1f6ec59')
					.then(response => response.json())
					.then(data => {
						data.forEach(player => {
							console.log(player);
							var players = document.createElement('div');
							var info_players_b = document.createElement('div');
							var photo = document.createElement('img');
							var name = document.createElement('p');
							var number = document.createElement('p');							

							document.getElementById('players_b').appendChild(players);
							players.classList.add('each_players_b');
							info_players_b.classList.add('info_players_b');

							players.appendChild(info_players_b);
							info_players_b.append(photo, name, number);
							photo.src = player.PhotoUrl;
							name.textContent = player.FirstName + " " + player.LastName;
							number.textContent = player.Jersey;

							
								info_players_b.addEventListener('click', () => {
									scrollTop();
									current_players.style.display = "none";
									bskt_i.style.display = "none";
									go_back_b.style.display = "none";
									go_back_b_2.style.display = "flex";
									go_back_b_2.textContent = "<- Go back to " + team.City + " " + team.Name;

									var player_left = document.createElement('div');


									bskt_d.appendChild(player_left);
									var photo = document.createElement('img');
									var jersey = document.createElement('p');
									var position = document.createElement('p');
									var country = document.createElement('p');
									var birthdate = document.createElement('p');

									player_left.classList.add('player_left');
									document.getElementById('player_name').textContent = player.FirstName + " " + player.LastName;

									player_left.append(photo, country, birthdate, position, jersey);

									photo.src = player.PhotoUrl;
									country.textContent = "Country : " + player.BirthCountry;
									position.textContent = "Position : " + player.DepthChartPosition;
									birthdate.textContent = "Birthdate : " + player.BirthDate.slice(0, 10);
									jersey.textContent = "Jersey : " + player.Jersey;

									var player_right = document.createElement('div');
									bskt_n.appendChild(player_right);
									player_right.classList.add('player_right');

									fetch('https://api.sportsdata.io/v3/nba/scores/json/NewsByPlayerID/' + player.PlayerID + '?key=9756c7d8f085466e8131568cd1f6ec59')
										.then(response => response.json())
										.then(data => {
											data.forEach(news => {

												var content = document.createElement('p');
												var date = document.createElement('p');
												var title = document.createElement('p');
												const lastnews = document.createElement('h2');
												lastnews.textContent = "Last news";
												player_right.append(lastnews, title, date, content);
												title.textContent = news.Title;
												date.textContent = "Updated : " + news.Updated.slice(0, 10);
												content.textContent = news.Content;
											})
										})
								})
							
						})

					})




				go_back_b.addEventListener('click', () => {
					bskt_t.style.display = "flex";
					bskt_i.style.display = "none";
					go_back_b.style.display = "none";
					bskt_i.innerHTML = "";
					document.getElementById('players_b').innerHTML = "";
					go_back_b.style.display = "none";
					titles.style.display = "flex";
					current_players.style.display = "none";
				})
				go_back_b_2.addEventListener('click', () => {
					go_back_b_2.style.display = "none";
					bskt_n.innerHTML = "";
					bskt_d.innerHTML = "";
					current_players.style.display = "flex";
					bskt_i.style.display = "flex";
					go_back_b.style.display = "flex";
					document.getElementById('player_name').innerHTML = "";


				})
			})

		})
	})



// Click selected
const btn_nba = document.getElementById('btn_nba');
const btn_foot = document.getElementById('btn_foot');
bskt.classList.add('hidden_bskt');
btn_foot.addEventListener('click', () => {
	btn_foot.classList.add('selected');
	btn_nba.classList.remove('selected');
	bskt.classList.remove('here');
	foot.classList.remove('hidden');
});
btn_nba.addEventListener('click', () => {
	btn_nba.classList.add('selected');
	btn_foot.classList.remove('selected');
	bskt.classList.add('here');
	foot.classList.add('hidden');
})

function scrollTop() {
	window.scrollTo({
		top: 50,
		left: 0,
	})
}