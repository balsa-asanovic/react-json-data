import { useEffect, useState } from 'react';
import './App.css';
import Tile from './components/Tile/Tile';
import { Box } from '@chakra-ui/react';

interface TileData {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	offset: number;
	rating: number;
  }

const App = () => {
	const [data, setData] = useState<TileData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// http://localhost:3001/tiles can also be used, this pulls data from local
				// json file db.json
				// I've also put db.json on github pages so I could pull data
				// from there for the Netlify site at https://soft-sorbet-e97f0d.netlify.app/
				const response = await fetch('https://balsa-asanovic.github.io/db.json');
			  	if (!response.ok) {
					throw new Error('Network response was not ok');
			  	}
			  	const jsonData = await response.json();
			  	setData(jsonData);
			} catch (error) {
			  	console.error('Error fetching data:', error);
			}
		  }
	  
		fetchData();
	}, []);

	return (
		<div className="App">
			<div className="tile-container">
				<Box
					display="grid"
					gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" // Automatically adapt columns based on available width
          			gridGap="16px"
				>
					{data.map((tileData, index) =>
						<Tile 
							key={index} 
							title={tileData.title}
							subtitle={tileData.subtitle}
							image={tileData.image}
							offset={tileData.offset}
							rating={tileData.rating}
						/>
				)}
				</Box>
			</div>
		</div>
	);
}

export default App;
