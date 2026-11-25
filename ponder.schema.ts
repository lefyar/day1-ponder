import { onchainTable, relations } from "ponder";

export const transfer = onchainTable("transfer", (t) => ({
  id: t.text().primaryKey(),
  hash: t.hex(),
  from: t.hex(),
  to: t.hex(),
  timestamp: t.bigint(),
  amount: t.bigint(),
}));

// new table to track total minted tokens per address
export const user = onchainTable("user", (t) => ({
  id: t.text().primaryKey(),
  totalTransferCount: t.bigint(),
  totalTransferAmount: t.bigint(),
}));

// user -> transfer relation (one-to-many)
export const userRelations = relations(user, ({ many }) => ({
  transfers: many(transfer),
}));

// transfer -> user relation (many-to-one)
export const transferRelations = relations(transfer, ({ one }) => ({
  user: one(user, {
    fields: [transfer.from],
    references: [user.id],
  }),
}));

