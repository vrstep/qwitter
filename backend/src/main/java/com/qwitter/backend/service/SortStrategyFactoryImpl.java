package com.qwitter.backend.service;

import com.qwitter.backend.utils.SortStrategy;
import com.qwitter.backend.utils.SortStrategyFactory;

public class SortStrategyFactoryImpl implements SortStrategyFactory {
    @Override
    public SortStrategy getSortStrategy(String sortType) {
        if(sortType.equals("date")){
            return new SortByDateStrategy();
        }
        else if(sortType.equals("likes")){
            return new SortByLikesStrategy();
        }
        throw new IllegalArgumentException("Invalid sort type");
    }
}
