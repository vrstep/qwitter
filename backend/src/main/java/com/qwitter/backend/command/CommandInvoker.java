package com.qwitter.backend.command;

import org.springframework.stereotype.Service;

import java.util.Stack;

@Service
public class CommandInvoker {
    private final Stack<Command> commandHistory;

    public CommandInvoker(){
        commandHistory = new Stack<>();
    }

    public void executeCommand(Command command){
        command.execute();
        commandHistory.push(command);
    }

    public void undoLastCommand(){
        if(!commandHistory.isEmpty()){
            Command command = commandHistory.pop();
            command.undo();
        }
    }
}
