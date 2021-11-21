This is the Club Nerva Membership contract. The purpouse of this contract is for me to distribute NFTs to Club Nerva members. They can't be traded or transferable and only I can award this membership.

We're using standard openzepplin libraries

NFTs are only mintable by owner
Transfers and approvals are only allowed to be called by owner.

compile:
```
npx truffle compile --all
```

deploy:
```
npx truffle migrate --reset --network ropsten #don't use --reset if you just want to update it in place!
```

verify:
```
npx truffle run verify ClubNervaMembership@<contract address> --network ropsten
```