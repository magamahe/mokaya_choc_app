const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Solo estos dos valores son válidos
      default: "user",
    },
  },
  { timestamps: true },
); // Crea automáticamente createdAt y updatedAt

// Encriptar contraseña antes de guardar
userSchema.pre("save", async function () {
  // Si la contraseña no cambió (ej: el usuario solo cambió su nombre), no hacemos nada
  if (!this.isModified("password")) return;

  // Generamos el "sal" (un toque de aleatoriedad) y hasheamos
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
