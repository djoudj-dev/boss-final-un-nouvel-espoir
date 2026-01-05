import { WritableSignal } from '@angular/core';

export interface PromiseSignalHandlerOptions<TApi, TDomain> {
  dataSignal: WritableSignal<TDomain[]>;
  loadingSignal: WritableSignal<boolean>;
  errorSignal: WritableSignal<unknown>;
  mapper: (api: TApi) => TDomain;
}

export function handlePromiseAllWithSignals<TApi, TDomain>(
  promises: Promise<TApi>[],
  options: PromiseSignalHandlerOptions<TApi, TDomain>
): void {
  const { dataSignal, loadingSignal, errorSignal, mapper } = options;

  Promise.all(promises)
    .then(results => {
      dataSignal.set(results.map(api => mapper(api)));
      loadingSignal.set(false);
    })
    .catch(error => {
      errorSignal.set(error);
      dataSignal.set([]);
      loadingSignal.set(false);
    });
}
