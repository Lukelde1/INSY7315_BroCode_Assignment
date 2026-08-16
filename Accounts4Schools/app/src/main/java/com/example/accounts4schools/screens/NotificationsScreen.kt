package com.example.accounts4schools.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.model.NotificationItem
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.ui.components.AppDrawerScaffold
import com.example.accounts4schools.ui.components.ChipTone
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.StatusChip
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.LightBlueMuted
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextMuted
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun NotificationsScreen(
    onDestinationSelected: (DrawerDestination) -> Unit,
    modifier: Modifier = Modifier
) {
    val notifications = DummyData.notifications
    val unread = notifications.count { it.isUnread }

    AppDrawerScaffold(
        title = "Notifications",
        selectedDestination = DrawerDestination.Notifications,
        onDestinationSelected = onDestinationSelected,
        showNotificationAction = false
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize(),
            contentPadding = PaddingValues(horizontal = 18.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                SectionCard {
                    Text(
                        text = "Updates & alerts",
                        style = MaterialTheme.typography.titleMedium,
                        color = Navy
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = if (unread > 0) {
                            "You have $unread unread notification${if (unread == 1) "" else "s"}."
                        } else {
                            "No new notifications."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary
                    )
                }
            }

            items(notifications, key = { it.id }) { item ->
                NotificationCard(item)
            }

            item { Spacer(modifier = Modifier.height(8.dp)) }
        }
    }
}

@Composable
private fun NotificationCard(item: NotificationItem) {
    SectionCard {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.Top
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(LightBlueMuted),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Outlined.Notifications,
                    contentDescription = null,
                    tint = LightBlue
                )
            }
            Spacer(modifier = Modifier.size(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = item.title,
                        style = MaterialTheme.typography.titleMedium,
                        color = Navy,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.weight(1f)
                    )
                    if (item.isUnread) {
                        StatusChip(text = "NEW", tone = ChipTone.Info)
                    }
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = item.body,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(10.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    if (item.isUnread) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(LightBlue)
                        )
                        Spacer(modifier = Modifier.size(8.dp))
                    }
                    Text(
                        text = item.dateLabel,
                        style = MaterialTheme.typography.labelMedium,
                        color = TextMuted
                    )
                }
            }
        }
    }
}
