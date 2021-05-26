import React from "react";

// Create a context
const DataContext = React.createContext({});

// exporting the provider and consumer for DataContext
export const DataProvider = DataContext.Provider;
export const DataConsumer = DataContext.Consumer;

// exporting the DataContext
export default DataContext;
