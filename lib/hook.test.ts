import 'react';
import { expect, test } from 'vitest';
import { useDispatch } from 'react-redux';

import { renderHookWithProviders, test1Slice, test2Slice, test0Slice } from './utils/test-utils';
import useSchemeCheck from './hook';

test('schemecheck nonexists flag', () => {
  renderHookWithProviders(() => {
    const { isFlagged: v11 } = useSchemeCheck('nonexists1');
    expect(v11).toStrictEqual(false);
  });
});
test('schemecheck hook flag', () => {
  renderHookWithProviders(() => {
    const { isFlagged: v11, isFlagReached: r11 } = useSchemeCheck('test1Value1');
    const { isFlagged: v12, isFlagReached: r12 } = useSchemeCheck('test1Value2');
    const { isFlagged: v13, isFlagReached: r13 } = useSchemeCheck('test1Value3');
    expect(v11).toStrictEqual(true);
    expect(r11).toStrictEqual(true);
    expect(v12).toStrictEqual(true);
    expect(r12).toStrictEqual(true);
    expect(v13).toStrictEqual(true);
    expect(r13).toStrictEqual(true);

    const { isFlagged: v21, isFlagReached: r21 } = useSchemeCheck('test2Value1');
    const { isFlagged: v22, isFlagReached: r22 } = useSchemeCheck('test2Value2');
    const { isFlagged: v23, isFlagReached: r23 } = useSchemeCheck('test2Value3');
    expect(v21).toStrictEqual(true);
    expect(r21).toStrictEqual(true);
    expect(v22).toStrictEqual(true);
    expect(r22).toStrictEqual(true);
    expect(v23).toStrictEqual(true);
    expect(r23).toStrictEqual(true);

    const { isFlagged: v01, isFlagReached: r01 } = useSchemeCheck('test0Value1');
    expect(v01).toStrictEqual(true);
    expect(r01).toStrictEqual(false);
  });
});

test('schemecheck hook flag after change', () => {
  renderHookWithProviders(() => {
    const dispatch = useDispatch();
    dispatch(test0Slice.actions.changetest0());
    dispatch(test1Slice.actions.changetest1());
    dispatch(test2Slice.actions.changetest2());

    const { isFlagged: v11, isFlagReached: r11 } = useSchemeCheck('test1Value1');
    const { isFlagged: v12, isFlagReached: r12 } = useSchemeCheck('test1Value2');
    const { isFlagged: v13, isFlagReached: r13 } = useSchemeCheck('test1Value3');
    expect(v11).toStrictEqual(true);
    expect(r11).toStrictEqual(false);
    expect(v12).toStrictEqual(true);
    expect(r12).toStrictEqual(false);
    expect(v13).toStrictEqual(true);
    expect(r13).toStrictEqual(false);

    const { isFlagged: v21, isFlagReached: r21 } = useSchemeCheck('test2Value1');
    const { isFlagged: v22, isFlagReached: r22 } = useSchemeCheck('test2Value2');
    const { isFlagged: v23, isFlagReached: r23 } = useSchemeCheck('test2Value3');
    expect(v21).toStrictEqual(true);
    expect(r21).toStrictEqual(false);
    expect(v22).toStrictEqual(true);
    expect(r22).toStrictEqual(false);
    expect(v23).toStrictEqual(true);
    expect(r23).toStrictEqual(false);

    const { isFlagged: v01, isFlagReached: r01 } = useSchemeCheck('test0Value1');
    expect(v01).toStrictEqual(true);
    expect(r01).toStrictEqual(true);
  });
});

test('schemecheck hook flag function', () => {
  renderHookWithProviders(() => {
    const { isFlagged: v11, isFlagReached: r11 } = useSchemeCheck('test1Value1f');
    const { isFlagged: v12, isFlagReached: r12 } = useSchemeCheck('test1Value2f');
    const { isFlagged: v13, isFlagReached: r13 } = useSchemeCheck('test1Value3f');
    expect(v11).toStrictEqual(true);
    expect(r11).toStrictEqual(true);
    expect(v12).toStrictEqual(true);
    expect(r12).toStrictEqual(true);
    expect(v13).toStrictEqual(true);
    expect(r13).toStrictEqual(true);

    const { isFlagged: v21, isFlagReached: r21 } = useSchemeCheck('test2Value1f');
    const { isFlagged: v22, isFlagReached: r22 } = useSchemeCheck('test2Value2f');
    const { isFlagged: v23, isFlagReached: r23 } = useSchemeCheck('test2Value3f');
    expect(v21).toStrictEqual(true);
    expect(r21).toStrictEqual(true);
    expect(v22).toStrictEqual(true);
    expect(r22).toStrictEqual(true);
    expect(v23).toStrictEqual(true);
    expect(r23).toStrictEqual(true);

    const { isFlagged: v01, isFlagReached: r01 } = useSchemeCheck('test0Value1f');
    expect(v01).toStrictEqual(true);
    expect(r01).toStrictEqual(false);
  });
});

test('schemecheck hook flag function after change', () => {
  renderHookWithProviders(() => {
    const dispatch = useDispatch();
    dispatch(test0Slice.actions.changetest0());
    dispatch(test1Slice.actions.changetest1());
    dispatch(test2Slice.actions.changetest2());

    const { isFlagged: v11, isFlagReached: r11 } = useSchemeCheck('test1Value1f');
    const { isFlagged: v12, isFlagReached: r12 } = useSchemeCheck('test1Value2f');
    const { isFlagged: v13, isFlagReached: r13 } = useSchemeCheck('test1Value3f');
    expect(v11).toStrictEqual(true);
    expect(r11).toStrictEqual(false);
    expect(v12).toStrictEqual(true);
    expect(r12).toStrictEqual(false);
    expect(v13).toStrictEqual(true);
    expect(r13).toStrictEqual(false);

    const { isFlagged: v21, isFlagReached: r21 } = useSchemeCheck('test2Value1f');
    const { isFlagged: v22, isFlagReached: r22 } = useSchemeCheck('test2Value2f');
    const { isFlagged: v23, isFlagReached: r23 } = useSchemeCheck('test2Value3f');
    expect(v21).toStrictEqual(true);
    expect(r21).toStrictEqual(false);
    expect(v22).toStrictEqual(true);
    expect(r22).toStrictEqual(false);
    expect(v23).toStrictEqual(true);
    expect(r23).toStrictEqual(false);

    const { isFlagged: v01, isFlagReached: r01 } = useSchemeCheck('test0Value1f');
    expect(v01).toStrictEqual(true);
    expect(r01).toStrictEqual(true);
  });
});
