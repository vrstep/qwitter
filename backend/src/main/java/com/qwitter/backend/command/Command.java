package com.qwitter.backend.command;

public interface Command {
    void execute();
    void undo();
}
