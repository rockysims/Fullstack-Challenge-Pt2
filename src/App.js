import { Grid } from 'semantic-ui-react';
import UsersTable from './UsersTable';

function App() {
	return (
		<Grid>
			<Grid.Column>
				<UsersTable></UsersTable>
			</Grid.Column>
		</Grid>
	);
}

export default App
