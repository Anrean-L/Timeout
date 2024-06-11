import { createContext } from 'react';

const DataContext = createContext({
	data: [],
	updateData: () => {},
});
export default DataContext;
