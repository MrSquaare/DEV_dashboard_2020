import { UserSchemaModel, VerificationSchemaModel } from "@dashboard/types";
import express from "express";
import jwt from "jsonwebtoken";

export const verifyRouter = express.Router();

verifyRouter.get("/verify/:id", (req, res) => {
    VerificationSchemaModel.findOneAndDelete(
        { id: req.params.id },
        async (err, verification) => {
            if (err) {
                return res.status(500);
            }

            if (!verification) {
                return res.status(404).json({
                    data: "Verification not found",
                });
            }

            UserSchemaModel.findOneAndUpdate(
                { username: verification.username },
                { verified: true },
                (err, user) => {
                    if (err) {
                        return res.status(500);
                    }

                    if (!user) {
                        return res.status(404).json({
                            data: "User not found",
                        });
                    }

                    const token = jwt.sign(
                        { username: user.username },
                        process.env.JWT_SECRET || "unknown"
                    );

                    return res.json({
                        data: token,
                    });
                }
            );
        }
    );
});
