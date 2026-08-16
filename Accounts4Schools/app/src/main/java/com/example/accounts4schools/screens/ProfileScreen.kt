package com.example.accounts4schools.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.ui.components.AppDrawerScaffold
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.SuccessGreen
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun ProfileScreen(
    onDestinationSelected: (DrawerDestination) -> Unit,
    onNotificationsClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    val profile = DummyData.profile
    var fullName by rememberSaveable { mutableStateOf(profile.fullName) }
    var phone by rememberSaveable { mutableStateOf(profile.phoneNumber) }
    var email by rememberSaveable { mutableStateOf(profile.email) }
    var address by rememberSaveable { mutableStateOf(profile.address) }
    var savedMessage by rememberSaveable { mutableStateOf<String?>(null) }

    AppDrawerScaffold(
        title = "Profile",
        selectedDestination = DrawerDestination.Profile,
        onDestinationSelected = onDestinationSelected,
        onNotificationsClick = onNotificationsClicked
    ) { innerPadding ->
        Column(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 18.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            SectionCard {
                Text(
                    text = "Parent details",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Update your contact details for school notices and payment receipts.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }

            SectionCard {
                ProfileField(
                    label = "Full name",
                    value = fullName,
                    onValueChange = { fullName = it; savedMessage = null }
                )
                Spacer(modifier = Modifier.height(12.dp))
                ProfileField(
                    label = "Phone number",
                    value = phone,
                    onValueChange = { phone = it; savedMessage = null },
                    keyboardType = KeyboardType.Phone
                )
                Spacer(modifier = Modifier.height(12.dp))
                ProfileField(
                    label = "Email",
                    value = email,
                    onValueChange = { email = it; savedMessage = null },
                    keyboardType = KeyboardType.Email
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = address,
                    onValueChange = { address = it; savedMessage = null },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Address") },
                    minLines = 3,
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = LightBlue,
                        focusedLabelColor = LightBlue,
                        cursorColor = LightBlue
                    )
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = { savedMessage = "Changes saved." },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = LightBlue)
                ) {
                    Text("Save", style = MaterialTheme.typography.labelLarge)
                }
                savedMessage?.let {
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(text = it, color = SuccessGreen, style = MaterialTheme.typography.bodyMedium)
                }
            }

            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

@Composable
private fun ProfileField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
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
