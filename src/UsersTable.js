import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, sortBy } from './store/usersSlice';
import { Table } from 'semantic-ui-react';

function UsersTable() {
	const { data, column, direction, loading, errorMessage } = useSelector(state => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loading === 'idle') {
			dispatch(fetchUsers());
		}
	}, []);

	if (loading === 'pending') {
		return <>Loading...</>;
	}

	if (loading === 'error') {
		return <>{errorMessage}</>;
	}

	if (data.length === 0) {
		return <>No users found.</>;
	}

	//workaround for issue with sematic-ui's table where sort arrow icon points in the opposite direction of the sort
	function flip(direction) {
		return direction === 'ascending'
			? 'descending'
			: 'ascending';
	}

	const columnNames = Object.keys(data[0]);
	return (<>
		<Table sortable celled>
			<Table.Header>
				<Table.Row>
					{columnNames.map(columnName => (
						<Table.HeaderCell
							key={columnName}
							sorted={column === columnName ? flip(direction) : null}
							onClick={() => dispatch(sortBy(columnName))}
						>
							{columnName}
						</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map(row => (
					<Table.Row key={row.id}>
						{columnNames.map(columnName => (
							<Table.Cell key={columnName}>{row[columnName]}</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</>);
}

export default UsersTable;
