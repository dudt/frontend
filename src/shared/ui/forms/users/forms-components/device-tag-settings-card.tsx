import {
    Anchor,
    Checkbox,
    Code,
    Fieldset,
    Group,
    Input,
    NumberInput,
    Stack,
    Text,
    Textarea,
    Title
} from '@mantine/core'
import {
    CreateUserCommand,
    GetAllTagsCommand,
    UpdateUserCommand
} from '@remnawave/backend-contract'
import { ForwardRefComponent, HTMLMotionProps, Variants } from 'motion/react'
import { TbDevices2, TbSettings } from 'react-icons/tb'
import { UseFormReturnType } from '@mantine/form'
import { useTranslation } from 'react-i18next'

import { CreateableTagInputShared } from '@shared/ui/createable-tag-input/createable-tag-input'

interface IProps<T extends CreateUserCommand.Request | UpdateUserCommand.Request> {
    cardVariants: Variants
    form: UseFormReturnType<T>
    motionWrapper: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>
    tags: GetAllTagsCommand.Response['response'] | undefined
}

export function DeviceTagSettingsCard<
    T extends CreateUserCommand.Request | UpdateUserCommand.Request
>(props: IProps<T>) {
    const { t } = useTranslation()

    const { cardVariants, motionWrapper, form, tags } = props

    const MotionWrapper = motionWrapper

    return (
        <MotionWrapper variants={cardVariants}>
            <Fieldset
                legend={
                    <Group gap="xs" mb="xs">
                        <TbSettings
                            size={20}
                            style={{
                                color: 'var(--mantine-color-orange-4)'
                            }}
                        />
                        <Title c="orange.4" order={5}>
                            {t('device-tag-settings-card.device-and-tag-settings')}
                        </Title>
                    </Group>
                }
            >
                <Stack gap="md">
                    <Stack gap={0}>
                        <Input.Label>{t('create-user-modal.widget.hwid-device-limit')}</Input.Label>
                        <Input.Description component="div">
                            <>
                                <Text c="dimmed" size="0.75rem">
                                    {t('create-user-modal.widget.hwid-user-limit-line-1')}{' '}
                                    <Code>HWID_DEVICE_LIMIT_ENABLED</Code>{' '}
                                    {t('create-user-modal.widget.hwid-user-limit-line-2')}{' '}
                                    <Code>true</Code>.{' '}
                                    <Anchor
                                        href="https://remna.st/docs/features/hwid-device-limit"
                                        target="_blank"
                                    >
                                        {t('create-user-modal.widget.hwid-user-limit-line-3')}
                                    </Anchor>
                                </Text>
                                <Checkbox
                                    checked={form.getValues().hwidDeviceLimit === 0}
                                    label={t('create-user-modal.widget.disable-hwid-limit')}
                                    mb="xs"
                                    mt="xs"
                                    onChange={(event) => {
                                        const { checked } = event.currentTarget
                                        form.setFieldValue(
                                            'hwidDeviceLimit',
                                            // @ts-expect-error TODO: fix this
                                            checked ? 0 : null
                                        )
                                    }}
                                />
                            </>
                        </Input.Description>

                        <NumberInput
                            allowDecimal={false}
                            allowNegative={false}
                            disabled={form.getValues().hwidDeviceLimit === 0}
                            hideControls
                            key={form.key('hwidDeviceLimit')}
                            leftSection={<TbDevices2 size="16px" />}
                            placeholder="HWID_FALLBACK_DEVICE_LIMIT in use"
                            {...form.getInputProps('hwidDeviceLimit')}
                        />
                    </Stack>

                    <CreateableTagInputShared
                        key={form.key('tag')}
                        {...form.getInputProps('tag')}
                        tags={tags?.tags ?? []}
                        value={form.getValues().tag}
                    />

                    <Textarea
                        description={t('create-user-modal.widget.user-description')}
                        key={form.key('description')}
                        label={t('use-table-columns.description')}
                        resize="vertical"
                        {...form.getInputProps('description')}
                        styles={{
                            label: { fontWeight: 500 }
                        }}
                    />
                </Stack>
            </Fieldset>
        </MotionWrapper>
    )
}
