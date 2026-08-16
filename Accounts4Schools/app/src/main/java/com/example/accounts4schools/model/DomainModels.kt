package com.example.accounts4schools.model

enum class TransactionType(val displayName: String, val subtitle: String) {
    SCHOOL_FEES("School fees", "Compulsory"),
    CAMPS_EVENTS("Camps / events", "Conditional"),
    FUNDRAISING("Fundraising", "Optional")
}

data class TransactionLineItem(
    val id: String,
    val type: TransactionType,
    val title: String,
    val dateLabel: String,
    val amount: Double
)

enum class PaymentMethod {
    CARD, EFT;

    val displayName: String
        get() = when (this) {
            CARD -> "Debit / Credit card"
            EFT -> "EFT / Instant EFT"
        }

    val hint: String
        get() = when (this) {
            CARD -> "Pay with your debit or credit card"
            EFT -> "Pay from your bank account"
        }
}

data class NotificationItem(
    val id: String,
    val title: String,
    val body: String,
    val dateLabel: String,
    val isUnread: Boolean = false
)

data class ParentAccount(
    val parentName: String,
    val studentName: String,
    val grade: String,
    val schoolName: String,
    val accountNumber: String,
    val balance: Double,
    val isInArrears: Boolean,
    val arrearsLabel: String
)

data class ParentProfile(
    val fullName: String,
    val phoneNumber: String,
    val email: String,
    val address: String
)
