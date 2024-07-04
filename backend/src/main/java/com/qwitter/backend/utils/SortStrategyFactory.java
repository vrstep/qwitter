package com.qwitter.backend.utils;

public interface SortStrategyFactory {
    SortStrategy getSortStrategy(String sortType);
}
