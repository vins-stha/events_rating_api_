import {Request, Response, NextFunction} from 'express'



// get all list of events
export const getAll = async(
    req, res, next
) => {
    console.log('list of all events');
};

// get all list of events
export const addNewEvent = async(
    req, res, next
) => {
    console.log('adding events');
};


// get all list of events
export const findEventById = async(
    req, res, next
) => {
    console.log('find event by id');
}


// get all list of events
export const updateEventById = async(
    req, res, next
) => {
    console.log('updated of all events');
}

// get all list of events
export const deleteEventById = async(
    req, res, next
) => {
    console.log('delete event of all events');
};

// Add votes to event
export const addVote = async(
    req, res, next
) => {
    console.log('Add vote  of all events');
};

// get list of suitable events for all users
// get all list of events
export const getFinalResultsOfEvent = async(
    req, res, next
) => {
    console.log('list of all events');
};