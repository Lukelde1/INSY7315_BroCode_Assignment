package com.example.accounts4schools.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.ui.theme.DangerRed
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun RegisterScreen(
    onRegisterClicked: () -> Unit,
    onBackToLoginClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    var fullName by rememberSaveable { mutableStateOf("") }
    var email by rememberSaveable { mutableStateOf("") }
    var phone by rememberSaveable { mutableStateOf("") }
    var learnerName by rememberSaveable { mutableStateOf("") }
    var schoolName by rememberSaveable { mutableStateOf("") }
    var learnerNumber by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }
    var confirmPassword by rememberSaveable { mutableStateOf("") }
    var passwordVisible by rememberSaveable { mutableStateOf(false) }
    var confirmPasswordVisible by rememberSaveable { mutableStateOf(false) }
    var errorText by rememberSaveable { mutableStateOf<String?>(null) }

    fun validateAndSubmit() {
        errorText = when {
            fullName.isBlank() -> "Please enter your full name."
            email.isBlank() || !email.contains("@") -> "Please enter a valid email address."
            phone.isBlank() -> "Please enter your phone number."
            learnerName.isBlank() -> "Please enter your child’s name."
            schoolName.isBlank() -> "Please enter the school name."
            password.length < 6 -> "Password must be at least 6 characters."
            password != confirmPassword -> "Passwords do not match."
            else -> null
        }
        if (errorText == null) {
            onRegisterClicked()
        }
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(Color(0xFF122038), Navy, Color(0xFF1F3A63))
                )
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 22.dp, vertical = 20.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBackToLoginClicked) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back to login",
                        tint = Color.White
                    )
                }
                Text(
                    text = "Create account",
                    style = MaterialTheme.typography.titleLarge,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Surface(
                shape = RoundedCornerShape(24.dp),
                color = Color.White,
                shadowElevation = 8.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(22.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        text = "Parent sign up",
                        style = MaterialTheme.typography.titleLarge,
                        color = Navy
                    )
                    Text(
                        text = "Create an account to view and pay school fees.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary
                    )

                    Text(
                        text = "Your details",
                        style = MaterialTheme.typography.titleSmall,
                        color = Navy,
                        modifier = Modifier.padding(top = 4.dp)
                    )

                    RegisterField(
                        value = fullName,
                        onValueChange = { fullName = it; errorText = null },
                        label = "Full name"
                    )
                    RegisterField(
                        value = email,
                        onValueChange = { email = it; errorText = null },
                        label = "Email",
                        keyboardType = KeyboardType.Email
                    )
                    RegisterField(
                        value = phone,
                        onValueChange = { phone = it; errorText = null },
                        label = "Phone number",
                        keyboardType = KeyboardType.Phone
                    )

                    Text(
                        text = "Learner & school",
                        style = MaterialTheme.typography.titleSmall,
                        color = Navy,
                        modifier = Modifier.padding(top = 4.dp)
                    )

                    RegisterField(
                        value = learnerName,
                        onValueChange = { learnerName = it; errorText = null },
                        label = "Child’s full name"
                    )
                    RegisterField(
                        value = schoolName,
                        onValueChange = { schoolName = it; errorText = null },
                        label = "School name"
                    )
                    RegisterField(
                        value = learnerNumber,
                        onValueChange = { learnerNumber = it; errorText = null },
                        label = "Learner / account number (optional)"
                    )

                    Text(
                        text = "Password",
                        style = MaterialTheme.typography.titleSmall,
                        color = Navy,
                        modifier = Modifier.padding(top = 4.dp)
                    )

                    PasswordField(
                        value = password,
                        onValueChange = { password = it; errorText = null },
                        label = "Password",
                        visible = passwordVisible,
                        onVisibilityChange = { passwordVisible = it }
                    )
                    PasswordField(
                        value = confirmPassword,
                        onValueChange = { confirmPassword = it; errorText = null },
                        label = "Confirm password",
                        visible = confirmPasswordVisible,
                        onVisibilityChange = { confirmPasswordVisible = it }
                    )

                    errorText?.let {
                        Text(
                            text = it,
                            color = DangerRed,
                            style = MaterialTheme.typography.bodySmall
                        )
                    }

                    Button(
                        onClick = { validateAndSubmit() },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(52.dp),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = LightBlue,
                            contentColor = Color.White
                        )
                    ) {
                        Text("Create account", style = MaterialTheme.typography.labelLarge)
                    }

                    TextButton(
                        onClick = onBackToLoginClicked,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    ) {
                        Text("Already have an account? Log in", color = LightBlue)
                    }
                }
            }

            Spacer(modifier = Modifier.height(18.dp))
        }
    }
}

@Composable
private fun RegisterField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    keyboardType: KeyboardType = KeyboardType.Text
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = Modifier.fillMaxWidth(),
        label = { Text(label) },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = LightBlue,
            focusedLabelColor = LightBlue,
            cursorColor = LightBlue
        )
    )
}

@Composable
private fun PasswordField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    visible: Boolean,
    onVisibilityChange: (Boolean) -> Unit
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = Modifier.fillMaxWidth(),
        label = { Text(label) },
        singleLine = true,
        visualTransformation = if (visible) VisualTransformation.None else PasswordVisualTransformation(),
        trailingIcon = {
            IconButton(onClick = { onVisibilityChange(!visible) }) {
                Icon(
                    imageVector = if (visible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                    contentDescription = if (visible) "Hide password" else "Show password"
                )
            }
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = LightBlue,
            focusedLabelColor = LightBlue,
            cursorColor = LightBlue
        )
    )
}
